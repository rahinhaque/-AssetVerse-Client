import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const queryClient = useQueryClient();

  const [name, setName] = useState(user?.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : ""
  );
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    user?.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "User"
      )}&background=random`
  );

  // Fetch employee's company affiliations
  const { data: affiliations = [], isLoading: loadingAffiliations } = useQuery({
    queryKey: ["myAffiliations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/affiliations/${user.email}`);
      return res.data.data || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.patch("/employee/profile", formData, {
        headers: {
          // DO NOT set Content-Type — let browser set it with boundary for FormData
          "x-user-email": user.email,
        },
      });
      if (!res.data.success)
        throw new Error(res.data.message || "Update failed");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myAffiliations", user.email]);
      alert("Profile updated successfully!");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (dateOfBirth) formData.append("dateOfBirth", dateOfBirth);
    if (profilePic) formData.append("photo", profilePic);

    try {
      await updateMutation.mutateAsync(formData);

      // Update auth context if name changed
      if (name !== user.name) {
        updateUserProfile({ displayName: name });
      }
    } catch (err) {
      alert(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={previewUrl} alt="Profile" />
                </div>
              </div>
              <h2 className="card-title text-2xl">
                {user?.name || "Employee"}
              </h2>
              <p className="text-sm opacity-70">{user?.email}</p>
              <p className="text-sm mt-2">
                Member since:{" "}
                {user?.createdAt
                  ? format(new Date(user.createdAt), "dd MMM yyyy")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Edit Form + Affiliations */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-6">Update Profile</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profile Picture</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email (Read-only)</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full bg-base-200"
                    value={user?.email || ""}
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Company Affiliations */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-6">
                My Company Affiliations
              </h2>

              {loadingAffiliations ? (
                <p>Loading affiliations...</p>
              ) : affiliations.length === 0 ? (
                <p className="opacity-70">
                  You are not affiliated with any company yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {affiliations.map((aff) => (
                    <div key={aff._id} className="card bg-base-200">
                      <div className="card-body py-4">
                        <h3 className="font-bold">{aff.companyName}</h3>
                        <p className="text-sm opacity-70">
                          Managed by: {aff.hrEmail}
                        </p>
                        <p className="text-sm">
                          Joined:{" "}
                          {format(new Date(aff.affiliationDate), "dd MMM yyyy")}
                        </p>
                        <span className="badge badge-success badge-sm mt-2">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
