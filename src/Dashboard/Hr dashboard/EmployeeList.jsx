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

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees", user?.companyName],
    enabled: !!user?.companyName,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/employees/${user.companyName}`);
      return res.data.data || [];
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

  const handleRemoveClick = (emp) => {
    setEmployeeToRemove(emp);
    setShowConfirmModal(true);
  };

  const confirmRemove = () => {
    if (employeeToRemove) {
      removeMutation.mutate(employeeToRemove.employeeEmail);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading employees...</div>;
  }

  const totalEmployees = employees.length;
  const packageLimit = user?.packageLimit || 5; // Assuming HR has packageLimit in user object

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Employee List</h1>
        <div className="badge badge-lg badge-primary">
          {totalEmployees}/{packageLimit} employees used
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

      {/* Confirmation Modal */}
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
    </div>
  );
};

export default EmployeeList;
