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
    <div>
      <h2>Livros</h2>
      <ul>
        {books.map(book => (<li>
          <p>{book.title}</p>
          <p>{book.price}</p>
          <button className="bg-green-400" onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
        </li>))}
      </ul>

      <h2>Shopping Cart ({totalCart.toFixed(2)})</h2>
      <h2>Carrinho</h2>
      <ul>
        {shoppingCart.map((item) => (<li>
          <p>Book: {item.product.title}</p>
          <p>Preço: {item.product.price}</p>
          <p>Quantidade: {(item.quantity)}</p>
          <p>Total: {(item.quantity * item.product.price).toFixed(2)}</p>
          <button onClick={() => handleRemoveFromCart(item.product.id)}>Remove</button>
        </li>))}
      </ul>

    </div>
  );
}
