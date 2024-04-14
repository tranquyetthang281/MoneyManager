import Transactions from "@/pages/Transactions";
import Budgets from "@/pages/Budgets";
import SpendingReport from "@/pages/SpendingReport";
import NotFound404 from "@/pages/NotFound404";
import MyWallets from "@/pages/MyWallets";
import { OnlyHeaderLayout } from "@/layouts";
import LogIn from "@/pages/LogIn";

export const privateRoutes = [
    { path: '/', component: Transactions },
    { path: '/wallet/:walletId', component: Transactions },
    { path: '/budgets', component: Budgets },
    { path: '/spending-report', component: SpendingReport },
    { path: '/my-wallets', component: MyWallets, layout: OnlyHeaderLayout },
]

export const publicRoutes = [
    { path: '/login', component: LogIn},
    { path: '*', component: NotFound404},
]