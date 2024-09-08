import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { getBook } from "@/lib/actions";
import Image from "next/image";

interface ModalComponentProps {
  bookId: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalComponent({ bookId, isOpen, onClose }: ModalComponentProps) {
  const [book, setBook] = useState<any>({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(bookId);
        setBook(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <Modal 
      size="sm" 
      isOpen={isOpen} 
      onClose={onClose}
      className="fixed right-0 top-0 bottom-0 md:w-1/3 mt-0 h-full m-0 overflow-y-scroll"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Book Details</ModalHeader>
          <ModalBody>
            <div className="flex justify-center">
              <Image src={book?.image} alt="book" width={300} height={300} className="rounded-md" />
            </div>
            <div className="flex-grow">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{book?.title}</h1>

        {/* Authors */}
        <div className="mb-4">
          <span className="text-lg font-semibold text-gray-700">Authors: </span>
          <ul className="flex flex-wrap gap-2 mt-1">
            {book?.authors?.map((author: any) => (
              <li key={author.id} className="text-sm text-gray-600">
                {author.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Description:</h2>
          <p
            className="text-gray-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: book?.description }}
          />
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-700">Format: </span>
            {book?.form?.toUpperCase()}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Language: </span>
            {book?.language?.toUpperCase()}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Pages: </span>
            {book?.extents?.gl_pages}
          </div>
          <div>
            <span className="font-semibold text-gray-700">ISBN: </span>
            {book?.isbn}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Publisher: </span>
            {book?.publisher}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Adult: </span>
            {book?.adult ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Price: </span>
            {book?.is_free ? "Free" : "Paid"}
          </div>
        </div>
      </div>
      </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
