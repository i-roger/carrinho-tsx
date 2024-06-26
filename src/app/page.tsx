'use client'
import React, { useState } from "react";
import Image from "next/image";

interface IBook {
  id:number,
  title:string,
  price:number
}

interface IShoppingCartItem {
  product: IBook
  quantity: number
}

const books: IBook[] = [
  {id:1, title:"pragmatic programmer", price: 10.99},
  {id:2, title:"Clean Code", price: 8.99},
  {id:3, title:"Clean Architecture", price: 90.99}
]

export default function Home() {

  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([])
  
  const handleAddToCart = (id: number) => {
    const book = books.find(book => book.id === id)
    const alreadyInShoppingCart = shoppingCart.find(item => item.product.id === id)
    
    // if book is in the shopping cart
    if(alreadyInShoppingCart) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map(item => {
        if (item.product.id === id) ({
          ...item,
          quantity: item.quantity++
        })
        return item
      })
      setShoppingCart(newShoppingCart)
      return
    }

    // if book is not in the shopping cart

    const cartItem : IShoppingCartItem = {
      product: book!,
      quantity: 1,
    }
    const newShoppingCart: IShoppingCartItem[] = [...shoppingCart, cartItem]
    setShoppingCart(newShoppingCart)
  }

  const handleRemoveFromCart = (id: number) => {
    const alreadyInShoppingCart = shoppingCart.find(
      (item) => item.product.id === id
    )

    if(alreadyInShoppingCart!.quantity > 1) {
      const newShoppingCart: IShoppingCartItem[] = shoppingCart.map(item => {
        if (item.product.id === id) ({
          ...item,
          quantity: item.quantity--
        })
        return item
      })
      setShoppingCart(newShoppingCart)
      return
    }

    //if there is only one item with the id in the cart
    const newShoppingCart: IShoppingCartItem[] = shoppingCart.filter(item => item.product.id !== id)
    setShoppingCart(newShoppingCart)
  }

  const totalCart = shoppingCart.reduce((total, current) => {
    return total + (current.product.price * current.quantity)
  }, 0)

  return (
    <div className="flex justify-evenly bg-zinc-400">
      <div>
        <h2 className="bg-white rounded p-2">Lista de Livros</h2>
        <ul>
          {books.map(book => (<li>
            <p>{book.title}</p>
            <p>{book.price}</p>
            <button className="bg-green-400 rounded p-2" onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
          </li>))}
        </ul>
      </div>

          {/* PARA VER O TOTAL ESTÁ ABAIXO */}
          <div id="carrinho-modal" className="">
      <div className="bg-white p-5 rounded-md min-w-[90%] md:min-w-[600px]"> {/* <---- Background do Card Modal */}
        <h2 className="text-center font-bold text-2xl mb-2">Meu Carrinho</h2>
        <div id="carrinho-items" className="flex flex-col justify-between mb-2">
        {shoppingCart.map((item) => (
          <div className="flex justify-between px-4 ring-[1px] shadow-md ring-gray-300 rounded" key={item.product.id}>
            <div className="flex justify-center gap-2 items-center">
              <Image className="p-2" alt="" width={100} height={300} src=""/>
              <div className="flex flex-col justify-center">
                <p>{item.product.title}</p>
                <p>Valor: {item.product.price.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})}</p>
                <p>Quantidade: {(item.quantity)}x</p>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 bg-red-500 rounded-full" onClick={() => handleRemoveFromCart(item.product.id)}>Remover</button>
            </div>
        </div>))}
        </div>
          <h2>Shopping Cart ({totalCart.toFixed(2)})</h2> 
      </div>

    </div>
    </div>
  );
}
