"use client";
import BookCard from "@/components/BookCard";
import HeaderDisplay from "@/components/HeaderDisplay";
import NavigationBar from "@/components/NavigationBar";
import SideBar from "@/components/SideBar";
import { getBookFromBookshelf, getBookshelves } from "@/lib/actions";
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
      <div className="flex max-h-screen min-h-screen bg-default-50">
        <SideBar bookshelves={bookshelves} setSelectedShelf={setSelectedShelf} />

        <div className="flex flex-col w-full">
          <NavigationBar setSearchItem={setSearchItem} />

          <div className="overflow-y-scroll max-h-screen">
            <HeaderDisplay
              shelfData={selectedShelf}
            />
            {shelfId ? (
              <>
                <div className="grid grid-cols-3 gap-4 p-4">
                  {booksId.map((book: any) => (
                    <BookCard key={book.id} bookId={book} searchItem={searchItem} />
                  ))}
                </div>

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
              <div>Nothing to display</div>
            )}
          </div>
        </div>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </Suspense>
  );
}
