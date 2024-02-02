import Transactions from "../pages/Transactions";
import Budgets from "../pages/Budgets";
import SpendingReport from "../pages/SpendingReport";

const privateRoutes = [
    { path: '/', component: Transactions },
    { path: '/budgets', component: Budgets },
    { path: '/spending-report', component: SpendingReport },
]

export { privateRoutes }