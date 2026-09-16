import React, { createContext, useContext, useMemo, useState } from 'react';

// RNF02 — Estado do carrinho compartilhado entre as telas (Cardápio <-> Carrinho).
// Qualquer tela dentro do <CarrinhoProvider> consegue ler e alterar o carrinho
// usando o hook useCarrinho(), sem precisar passar props manualmente.

const CarrinhoContext = createContext(null);

// RF08 — Taxa fixa de entrega (só é cobrada quando existe pelo menos 1 item).
export const TAXA_ENTREGA = 6.0;

export function CarrinhoProvider({ children }) {
  const [items, setItems] = useState([]);

  // RF02 — Adiciona produto ao carrinho (ou incrementa se já existir).
  const adicionarItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // RF06 — Botão "+": incrementa a quantidade de um item já no carrinho.
  const incrementarItem = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // RF06 — Botão "-": decrementa a quantidade; remove o item ao chegar a 0.
  const decrementarItem = (productId) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remoção direta de um item (usada, por exemplo, num botão "remover").
  const removerItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const limparCarrinho = () => setItems([]);

  const quantityOf = (productId) => {
    const found = items.find((item) => item.id === productId);
    return found ? found.quantity : 0;
  };

  // RF03 — Contador do carrinho (soma das quantidades).
  const carrinhoCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  // RF07 — Subtotal: soma de (preço * quantidade) de cada item.
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  // RF08 — Taxa de entrega fixa só é cobrada com carrinho não vazio; total = subtotal + taxa.
  const taxaEntrega = items.length > 0 ? TAXA_ENTREGA : 0;
  const total = subtotal + taxaEntrega;

  const value = {
    items,
    adicionarItem,
    incrementarItem,
    decrementarItem,
    removerItem,
    limparCarrinho,
    quantityOf,
    carrinhoCount,
    subtotal,
    taxaEntrega,
    total,
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);

  if (!context) {
    throw new Error('useCarrinho precisa ser usado dentro de um <CarrinhoProvider>.');
  }

  return context;
}
