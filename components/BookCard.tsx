"use client";
import { getBook } from "@/lib/actions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalComponent from "./Modal";

const BookCard = ({ bookId, searchItem }: any) => {
  const [book, setBook] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookInSearch, setIsBookInSearch] = useState(false);

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
  }, []);

  useEffect(() => {
    if (searchItem) {
      if (
        book.title?.toLowerCase().includes(searchItem.toLowerCase()) ||
        book.authors?.some((author: any) =>
          author.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      ) {
        setIsBookInSearch(true);
      } else {
        setIsBookInSearch(false);
      }
    }
  }, [searchItem, book]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={
        searchItem.length && !isBookInSearch
          ? "hidden "
          : "" +
            `flex flex-col items-center gap-4 py-4 bg-white rounded px-4 cursor-pointer`
      }
      onClick={openModal}
    >
      <ModalComponent
        bookId={bookId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <div
        className={`w-full flex justify-center bg-gray-100 max-h-[300px] py-3 rounded overflow-hidden`}
      >
        <Image
          width={200}
          height={300}
          src={book?.image}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          alt="book"
        />
      </div>
      <div className="flex max-w-full overflow-scroll justify-start w-full">
        {book?.is_free ? (
          <Chip size="sm" color="success" className="mr-2 px-2">
            Free
          </Chip>
        ) : (
          ""
        )}
        {book?.adult ? (
          <Chip size="sm" color="danger" className="mr-2 px-2">
            Adult only
          </Chip>
        ) : (
          ""
        )}
      </div>
      <h1 className="font-[500] text-left w-full">{book?.title}</h1>
      <div className="w-full flex justify-between">
        <div>
          {book?.rating} {book?.rating_count ? <span>({book?.rating_count})</span> : ''}
        </div>
        <div className="font-[600] text-sm">
          {book?.price?.amount} {book?.price?.currency}
        </div>
      </div>
      <Divider />
      {book?.authors?.length > 0 ? (
        <div className="w-full">
          <div className="text-xs font-bold mb-2">Authors</div>
          <div className="w-full flex justify-between mb-4">
            {book?.authors?.map((author: any) => (
              <div key={author.id} className="flex items-center text-sm text-gray-400">
                <UserCircleIcon className="size-4 mr-1" />
                {author.name}
              </div>
            ))}
          </div>

          <Divider />
        </div>
      ) : (
        ""
      )}
      <div className="flex w-full justify-between">
        <div>
          <span className="text-sm font-bold">Language</span>
          <div className="text-sm text-gray-500">{book?.language}</div>
        </div>
        <div>
          <span className="text-sm font-bold">Format</span>
          <div className="text-sm text-gray-500">{book?.form}</div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
