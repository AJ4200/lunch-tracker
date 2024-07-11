import { useState, useEffect } from "react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

import { getAllTeamMembers, deleteTeamMember } from "@/lib/action";
import { ITeamMemberDocument } from "@/models/memberModel";

export const useTeamMembers = (initialDateRange: {
  start: CalendarDate;
  end: CalendarDate;
}) => {
  const [teamMembers, setTeamMembers] = useState<ITeamMemberDocument[]>([]);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<
    ITeamMemberDocument[]
  >([]);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null); // Track which member is being deleted
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7; // Number of items per page

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await getAllTeamMembers();
        if (Array.isArray(response)) {
          setTeamMembers(response);
          handleDateFilter(dateRange);
        } else {
          console.error("Error fetching team members:", response.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, [deleting]);

  const handleDateFilter = (value: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setDateRange(value);
    const filtered = teamMembers.filter((member) => {
      const memberDate = new Date(member.created_At);
      const startDate = value.start.toDate(getLocalTimeZone());
      const endDate = value.end.toDate(getLocalTimeZone());
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      return memberDate >= startDate && memberDate <= endDate;
    });
    setFilteredTeamMembers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const formData = new FormData();
      formData.append("id", id);
      const response = await deleteTeamMember(formData);
      if (typeof response === "string" && response === "Team member deleted") {
        const updatedTeamMembers = teamMembers.filter(
          (member) => member._id !== id
        );
        setTeamMembers(updatedTeamMembers);
        handleDateFilter(dateRange);
      } else if (
        response &&
        typeof response === "object" &&
        "message" in response
      ) {
        console.error("Error deleting team member:", response.message);
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
    setDeleting(null);
  };

  const paginatedMembers = filteredTeamMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    teamMembers,
    filteredTeamMembers,
    paginatedMembers,
    dateRange,
    loading,
    deleting,
    currentPage,
    totalPages,
    handleDateFilter,
    handleDelete,
    setCurrentPage,
  };
};
