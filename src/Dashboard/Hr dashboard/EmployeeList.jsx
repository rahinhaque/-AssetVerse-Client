import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignData, setAssignData] = useState({
    employeeEmail: "",
    assetId: "",
  });

  // Fetch employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees", user?.companyName],
    enabled: !!user?.companyName,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/employees/${user.companyName}`);
      return res.data.data || [];
    },
  });

  // Fetch available assets for assignment
  const { data: availableAssets = [] } = useQuery({
    queryKey: ["assignableAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/assets", {
        params: { hrEmail: user.email },
      });
      return res.data.data?.filter((a) => a.availableQuantity > 0) || [];
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`/hr/employees/${email}`);
      if (!res.data.success)
        throw new Error(res.data.message || "Failed to remove");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", user.companyName]);
      setShowConfirmModal(false);
      setEmployeeToRemove(null);
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ employeeEmail, assetId }) => {
      const res = await axiosSecure.post("/hr/assign-asset", {
        employeeEmail,
        assetId,
      });
      if (!res.data.success)
        throw new Error(res.data.message || "Assignment failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", user.companyName]);
      queryClient.invalidateQueries(["assignableAssets", user.email]);
      setShowAssignModal(false);
      setAssignData({ employeeEmail: "", assetId: "" });
      alert("Asset assigned successfully!");
    },
  });

  const handleRemoveClick = (emp) => {
    setEmployeeToRemove(emp);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    if (employeeToRemove) {
      removeMutation.mutate(employeeToRemove.employeeEmail);
    }
  };

  const openAssignModal = () => {
    setAssignData({ employeeEmail: "", assetId: "" });
    setShowAssignModal(true);
  };

  const handleAssignChange = (e) => {
    setAssignData({ ...assignData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading employees...</div>;
  }

  const totalEmployees = employees.length;
  const packageLimit = user?.packageLimit || 5;

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">My Employee List</h1>
        <div className="flex items-center gap-4">
          <div className="badge badge-lg badge-primary">
            {totalEmployees}/{packageLimit} employees used
          </div>
          <button className="btn btn-success" onClick={openAssignModal}>
            Assign Asset
          </button>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-70">No employees in your team yet.</p>
          <p className="text-sm opacity-50 mt-2">
            Employees will appear here once they request and get approved for an
            asset.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div key={emp.employeeEmail} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          emp.employeeName
                        )}&background=random`}
                        alt={emp.employeeName}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="card-title text-lg">{emp.employeeName}</h2>
                    <p className="text-sm opacity-70">{emp.employeeEmail}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Join Date</span>
                    <span className="text-sm font-medium">
                      {emp.affiliationDate
                        ? format(new Date(emp.affiliationDate), "dd MMM yyyy")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm opacity-70">Assets Assigned</span>
                    <span className="text-sm font-medium badge badge-secondary">
                      {emp.assetsCount || 0}
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleRemoveClick(emp)}
                  >
                    Remove from Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showConfirmModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Remove Employee from Team?</h3>
            <p className="py-4">
              Are you sure you want to remove{" "}
              <strong>{employeeToRemove?.employeeName}</strong> from your team?
            </p>
            <p className="text-sm opacity-70">
              This will mark them as inactive but won't delete their account.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmRemove}
                disabled={removeMutation.isPending}
              >
                {removeMutation.isPending ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Assign Asset Modal */}
      {showAssignModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Assign Asset to Employee</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                assignMutation.mutate(assignData);
              }}
              className="space-y-4 mt-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Employee</span>
                </label>
                <select
                  name="employeeEmail"
                  className="select select-bordered w-full"
                  value={assignData.employeeEmail}
                  onChange={handleAssignChange}
                  required
                >
                  <option value="">Choose an employee...</option>
                  {employees.map((emp) => (
                    <option key={emp.employeeEmail} value={emp.employeeEmail}>
                      {emp.employeeName} ({emp.employeeEmail})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Asset</span>
                </label>
                <select
                  name="assetId"
                  className="select select-bordered w-full"
                  value={assignData.assetId}
                  onChange={handleAssignChange}
                  required
                >
                  <option value="">Choose an asset...</option>
                  {availableAssets.map((asset) => (
                    <option key={asset._id} value={asset._id}>
                      {asset.productName} ({asset.productType}) - Available:{" "}
                      {asset.availableQuantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={assignMutation.isPending}
                >
                  {assignMutation.isPending ? "Assigning..." : "Assign Asset"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EmployeeList;
