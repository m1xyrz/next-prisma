import { createProduct, deleteProduct } from "@/actions/products-actions"
import prisma from "@/lib/db"

export default async function Home() {
  const products = await prisma.product.findMany()

  function renderProducts() {
    if (products.length === 0) {
      return <p>No products available.</p>
    }

    return (
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <form action={deleteProduct.bind(null, product.id)}>
              <button
                type="submit"
                className="border"
              >
                Hapus
              </button>
            </form>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <h1>Products</h1>
      {renderProducts()}

      <div className="w-full">
        <form
          action={createProduct}
          className="flex flex-col justify-center items-center gap-2"
        >
          <input
            type="text"
            name="name"
            className="border"
          />
          <input
            type="number"
            name="price"
            className="border"
          />
          <button
            type="submit"
            className="border"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}
