'use client'

export async function getBookshelves() {
    try {
        const res = await fetch(`/api/users/5a8411b53ed02c04187ff02a/shelves`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.json();
      } catch (error: any) {
        throw error;
      }
}  


export async function getBookFromBookshelf(shelveId: string, offset: number, limit: number) {
    try {
        const res = await fetch(`/api/shelves/${shelveId}/forms?offset=${offset}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.json();
      } catch (error: any) {
        throw error;
      }
}  


export async function getBook(formId: string) {
    try {
        const res = await fetch(`/api/forms/${formId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.json();
      } catch (error: any) {
        throw error;
      }
}  
