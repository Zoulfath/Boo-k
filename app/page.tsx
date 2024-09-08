"use client";
import BookCard from "@/components/BookCard";
import HeaderDisplay from "@/components/HeaderDisplay";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import { getBookFromBookshelf, getBookshelves } from "@/lib/actions";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ITEMS_PER_PAGE = 9;
export default function Home() {
  const [selectedShelf, setSelectedShelf] = useState<any>({});
  const [bookshelves, setBooksheves] = useState([]);
  const query = useSearchParams();
  const shelfId = query.get("shelfId");
  const [booksId, setBooksId] = useState([]);
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBookshelf = async () => {
      try {
        const response = await getBookshelves();
        setBooksheves(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookshelf();
  }, []);

  const getBooksId = async (shelfId: string) => {
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const limit = page * ITEMS_PER_PAGE;
      const response = await getBookFromBookshelf(shelfId, offset, limit);
      setBooksId(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setBooksId([]);
    if (shelfId) {
      const shelf = bookshelves.find((shelf: any) => shelf.id === shelfId);
      setSelectedShelf(shelf);
    }
  }, [bookshelves, shelfId]);

  useEffect(() => {
    if (shelfId) {
      setPage(1);
      getBooksId(shelfId);
    }
  }, [page, shelfId]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Suspense>
      <div className="flex flex-col lg:flex-row max-h-screen min-h-screen bg-default-50">
        {/* Sidebar for large screens, hidden on smaller screens */}
        <div className="hidden lg:block">
          <SideBar
            bookshelves={bookshelves}
            setSelectedShelf={setSelectedShelf}
          />
        </div>

        {/* Button to open sidebar on small screens */}
        <button
          className="lg:hidden fixed top-5 -right-1 z-50 bg-danger-100 text-white p-2 rounded-none rotate-90"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Bars3Icon className="size-6" />
        </button>

        {/* Sidebar modal for small screens */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex">
            <div className="bg-white w-3/4 max-w-xs h-full p-4">
              <SideBar
                bookshelves={bookshelves}
                setSelectedShelf={setSelectedShelf}
              />
              <button
                className="mt-4 bg-red-500 text-white p-2 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
            </div>
            <div
              className="flex-1"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          </div>
        )}

        <div className="flex flex-col w-full">
          {/* Navigation bar always visible */}
          <NavigationBar setSearchItem={setSearchItem} />

          <div className="overflow-y-scroll max-h-screen">
            {shelfId ? (
              <>
                <HeaderDisplay shelfData={selectedShelf} />
                
                {/* Responsive grid for books */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                  {booksId.map((book: any) => (
                    <BookCard
                      key={book.id}
                      bookId={book}
                      searchItem={searchItem}
                    />
                  ))}
                </div>

                {/* Pagination buttons */}
                <div className="flex justify-center my-4 gap-6">
                  <Button
                    isDisabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>

                  <Button
                    isDisabled={booksId.length < ITEMS_PER_PAGE}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <div className="bg-white mx-4 py-4 mt-4 rounded">
                <div className="grid gap-4">
                  <div className="w-60 h-60 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
                    {/* SVG or Placeholder */}
                  </div>
                  <div>
                    <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
                      Il n&apos;y a pas de livre ici!
                    </h2>
                    <p className="text-center text-black text-sm font-normal leading-snug pb-4">
                      Essayez de changer de filtre ou de selectionner une
                      étagère <br />
                      pour voir les livres{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
