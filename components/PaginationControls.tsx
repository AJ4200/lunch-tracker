import React from "react";
import { Pagination, Button } from "@nextui-org/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="flex flex-col items-right gap-4 self-end">
      <Pagination
        color="primary"
        page={currentPage}
        size="sm"
        total={totalPages}
        onChange={onPageChange}
      />
      <div className="flex gap-2">
        <Button color="default" size="sm" variant="flat" onPress={onPrevPage}>
          <FaCaretLeft />
        </Button>
        <Button color="default" size="sm" variant="flat" onPress={onNextPage}>
          <FaCaretRight />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
