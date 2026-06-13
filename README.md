# React Cart State Benchmark – Context vs Zustand vs Redux

This project implements the **same small cart application** in three different ways:

- `context-version` – React Context API
- `zustand-version` – Zustand store
- `redux-version` – Redux Toolkit

The goal is to compare **developer experience** and **render behaviour** across these state management approaches using a simple, realistic UI. [web:186][web:187][web:190][web:193]

---

## 1. Project structure

```text
react-cart-state-benchmark/
  context-version/   # Cart app using React Context
  zustand-version/   # Cart app using Zustand
  redux-version/     # Cart app using Redux Toolkit
```

Each folder is a standalone Vite + React app with its own `package.json` and `src` directory. [web:185][web:188][web:191]

---

## 2. Running each version

From the project root, install dependencies inside each version you want to run:

### Context version

```bash
cd context-version
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`). [web:185][web:188]

### Zustand version

```bash
cd zustand-version
npm install
npm run dev
```

Open the Vite dev URL in your browser. [web:99][web:101][web:105]

### Redux version

```bash
cd redux-version
npm install
npm run dev
```

Again, open the Vite dev URL in your browser. [web:139][web:144][web:181]

You can run them one at a time, or assign different ports if you want to have them all open simultaneously.

---

## 3. Features (common across all versions)

All three implementations share the same **UI and behaviour**:

- **Header**
  - App title: “My Store”.
  - Current user display (e.g. `User: John Doe`).
  - Theme toggle button (`Theme: Light` / `Theme: Dark`).
  - Live cart item count (e.g. `Cart items: 2`).
- **Product list**
  - Displays a small static catalog of three products (A, B, C) with prices.
  - Each product card has an “Add to cart” button.
- **Cart sidebar**
  - Lists cart line items as `ProductName x quantity`.
  - Shows aggregate cart total.
  - Provides “Remove” per item and a “Clear cart” button.

**Behaviour**

- Clicking **Add to cart**:
  - Adds the product if not present, otherwise increments its quantity.
  - Updates header cart count and cart sidebar line items.
  - Updates the total price.
- Clicking **Remove**:
  - Removes that product from the cart.
  - Updates count and total accordingly.
- Clicking **Clear cart**:
  - Empties the cart.
  - Resets header count and total to zero.
- Clicking **Theme toggle**:
  - Toggles theme state between `light` and `dark` and updates the button label.

This ensures the comparison focuses only on **state management differences**, not different UIs. [web:186][web:187][web:189][web:190]

---

## 4. State management implementations

### 4.1 Context version

- Uses **React Context API** with custom context providers for:
  - Theme
  - User
  - Products
  - Cart
- Components consume these via custom hooks like `useThemeContext`, `useUserContext`, `useCartContext`, etc.
- State lives high in the tree, and updates can cause broader re-renders because context propagates from the provider downwards. [web:186][web:187][web:189][web:193]

**When this approach is good**

- Small apps or low-frequency, global data such as theme, current user, or simple configuration.
- When you want to stay within “just React” without external dependencies. [web:186][web:187][web:189][web:193]

### 4.2 Zustand version

- Uses a single **Zustand** store (`useAppStore`) created via `create` from `zustand`. [web:99][web:101][web:105]
- The store holds:
  - `theme`
  - `user`
  - `products`
  - `cart`
- Each component selects exactly the piece of state it needs:
  - Header reads `theme`, `user`, and derived cart count.
  - Product list reads `products`.
  - Cart sidebar reads `cart` and `products`.
- Actions like `addToCart`, `removeFromCart`, `clearCart`, and `toggleTheme` are defined in the store and used directly in components.

**Why this can be more efficient**

- Components subscribe to **slices** of the store, so only the components that depend on changed state re-render, which typically reduces unnecessary re-renders compared to naïve Context usage. [web:186][web:189][web:190][web:193]

### 4.3 Redux version

- Uses **Redux Toolkit** with a single slice (`appSlice`) and a store in `store.ts`. [web:141][web:176][web:178][web:181]
- `appSlice` state mirrors the other versions:
  - `theme`, `user`, `products`, `cart`
- Actions:
  - `toggleTheme`
  - `setUser`
  - `addToCart`
  - `removeFromCart`
  - `clearCart`
- The store is connected via `<Provider store={store}>` in `main.tsx`.
- Components use:
  - `useSelector` to read from `state.app`
  - `useDispatch` to dispatch actions like `addToCart(productId)`

**Why Redux is useful**

- Single source of truth with predictable updates and DevTools support.
- Scales well for large apps with complex flows, but comes with more boilerplate than Zustand for simple cases. [web:186][web:189][web:190][web:193]

---

## 5. Render / performance instrumentation

To get a lightweight sense of **render frequency and timing**, a small hook was added (primarily in Context and Zustand versions, and optionally Redux): [web:107][web:108][web:110][web:113]

```ts
import { useEffect, useRef } from "react";

export function useRenderMetrics(componentName: string) {
  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current += 1;
    const now = performance.now();
    const sinceLast = now - lastRenderTimeRef.current;

    console.log(
      `[METRICS] ${componentName} render #${renderCountRef.current} (+${sinceLast.toFixed(
        2
      )} ms)`
    );

    lastRenderTimeRef.current = now;
  });
}
```

This hook is called inside selected components such as:

- `Header`
- `ProductListPage`
- `CartSidebar`
- `CartItemCount`

Example usage:

```ts
function Header() {
  useRenderMetrics("Header");
  // ...
}
```

When you interact with the app (add items, remove items, toggle theme), the browser console prints metrics like:

```text
[METRICS] Header render #3 (+12.34 ms)
```

This gives a rough view of how often each approach triggers re-renders in key components. [web:107][web:110][web:113]

---

## 6. Observations and qualitative comparison

These are the main qualitative takeaways when comparing **Context**, **Zustand**, and **Redux Toolkit** in this small cart scenario. [web:186][web:187][web:189][web:190][web:193]

| Aspect                 | Context API                                       | Zustand                                                 | Redux Toolkit                                           |
|------------------------|---------------------------------------------------|---------------------------------------------------------|--------------------------------------------------------|
| Setup complexity       | Very low (built into React)                       | Low (small store + hooks)                              | Medium (slice + store + Provider)                      |
| Boilerplate            | Low–medium                                       | Low                                                     | Medium (actions + reducers, even with RTK helpers)     |
| Re-render behaviour    | Can re-render many consumers when context changes | Fine‑grained per selector, fewer unnecessary re-renders | Good; depends on selector granularity and component use|
| DevTools               | React DevTools                                    | React DevTools, optional Zustand DevTools               | React DevTools + Redux DevTools                        |
| Best fit               | Simple global state (theme, user)                | Most medium‑sized apps needing simplicity and speed     | Large/complex apps with many flows and strict predictability |

For this specific cart:

- **Context** is easy to set up but can lead to broader re-renders when cart or theme updates propagate through a large subtree.
- **Zustand** keeps the code small while allowing components to subscribe only to the slices of state they need, which generally reduces render noise.
- **Redux Toolkit** introduces more structure and boilerplate than Zustand, but offers the most formal model (actions, reducers, DevTools) and scales well if the app grows significantly.

---

## 7. How to extend this project

Ideas for future work:

- Add React Profiler traces or automated benchmarks to compare actual render times across implementations. [web:107][web:110][web:111][web:116]
- Increase state complexity (e.g. filters, async fetches, persisted cart) to see how each solution scales.
- Integrate Redux DevTools and Zustand DevTools for a richer debugging experience. [web:99][web:141][web:181]

---

## 8. Requirements and tools

- **Runtime**: Node.js (version compatible with Vite)
- **Build tool**: Vite (React + TypeScript templates)
- **Libraries**:
  - React / React DOM
  - Zustand (for `zustand-version`)
  - Redux Toolkit + React-Redux (for `redux-version`) [web:99][web:101][web:105][web:139][web:144][web:181]

Install and run each version as described in section 2.

---