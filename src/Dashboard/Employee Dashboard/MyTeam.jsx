import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState("");

  // Fetch all assigned assets for the logged-in employee to get companies
  const { data: myAssets = [], isLoading: loadingAssets } = useQuery({
    queryKey: ["myAssetsForTeam", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/assets/${user.email}`);
      return res.data.data || [];
    },
  });

  // Extract unique companies from employee's assets
  const companies = [...new Set(myAssets.map((asset) => asset.companyName))];

  // Fetch all employees affiliated with the selected company
  const { data: teamMembers = [], isLoading: loadingTeam } = useQuery({
    queryKey: ["teamMembers", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/employees/${selectedCompany}`);
      return res.data.data || [];
    },
  });

  // Upcoming birthdays (current month)
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = teamMembers.filter((member) => {
    if (!member.dateOfBirth) return false;
    const birthMonth = new Date(member.dateOfBirth).getMonth();
    return birthMonth === currentMonth;
  });

  // Auto-select first company if none selected
  React.useEffect(() => {
    if (companies.length > 0 && !selectedCompany) {
      setSelectedCompany(companies[0]);
    }
  }, [companies, selectedCompany]);

  if (loadingAssets) {
    return <div className="p-8 text-center">Loading your team data...</div>;
  }

  if (companies.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl opacity-70">
          You are not assigned to any assets yet, so no team members to show.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Team</h1>

      {/* Company Selector */}
      <div className="mb-8">
        <label className="label">
          <span className="label-text font-medium">Select Company</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">
            Colleagues at {selectedCompany}
          </h2>

          {loadingTeam ? (
            <p>Loading team members...</p>
          ) : teamMembers.length === 0 ? (
            <p className="opacity-70">No team members found in this company.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.employeeEmail}
                  className="card bg-base-100 shadow-xl"
                >
                  <div className="card-body flex-row items-center gap-6">
                    <div className="avatar">
                      <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.employeeName
                          )}&background=random`}
                          alt={member.employeeName}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {member.employeeName}
                      </h3>
                      <p className="text-sm opacity-70">
                        {member.employeeEmail}
                      </p>
                      <p className="text-sm mt-1">
                        Position: <span className="font-medium">Employee</span>
                      </p>
                      <p className="text-sm">
                        Join Date:{" "}
                        {member.affiliationDate
                          ? format(
                              new Date(member.affiliationDate),
                              "dd MMM yyyy"
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Birthdays Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Upcoming Birthdays</h2>

              {upcomingBirthdays.length === 0 ? (
                <p className="opacity-70">No birthdays this month.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingBirthdays.map((member) => (
                    <div
                      key={member.employeeEmail}
                      className="flex items-center gap-4 p-3 bg-base-100 rounded-lg"
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.employeeName
                            )}&background=random`}
                            alt={member.employeeName}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{member.employeeName}</p>
                        <p className="text-sm opacity-70">
                          {format(new Date(member.dateOfBirth), "dd MMMM")}
                        </p>
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

export default MyTeam;
