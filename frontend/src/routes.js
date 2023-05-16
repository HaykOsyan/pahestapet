import AddingPage from "./pages/AddingPage"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Cart from "./pages/Cart"
import CartPage from "./pages/CartPage"
import Home from "./pages/Home"
import Order from "./pages/Order"
import ProductPage from "./pages/ProductPage"
import Samvel from "./pages/Samvel"
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CART_ROUTE, ORDER_ROUTE, HOME_ROUTE, SAMVEL_ROUTE, PRODUCT_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_ROUTE +'/adding_page',
        Component: AddingPage
    }

]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
    // {
    //     path: ADMIN_ROUTE+'/adding_page',
    //     Component: AddingPage
    // },
    {
        path: CART_ROUTE + '/:id',
        Component: CartPage
    },
    {
        path: ORDER_ROUTE + '/:id',
        Component: Order
    },
    {
        path: SAMVEL_ROUTE,
        Component: Samvel
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    }
]