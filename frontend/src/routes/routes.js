export const LOGIN_ROUTE = "/login"

export const DASHBOARD_ROUTE = "/dashboard"

const ADMIN_BASE_ROUTE = "/admin"

export const ADMIN_DASHBOARD_ROUTE =
    ADMIN_BASE_ROUTE + "/dashboard"

export const ADMIN_ORDERS_ROUTE =
    ADMIN_BASE_ROUTE + "/orders"

export const ADMIN_ORDER_DETAILS_ROUTE = 
    ADMIN_BASE_ROUTE + "/orders/:id"    

export const ADMIN_CREATE_DISH_ROUTE = 
    ADMIN_BASE_ROUTE + "/dishes/create" 

export const ADMIN_DISHES_ROUTE = ADMIN_BASE_ROUTE + "/dishes"
export const ADMIN_EDIT_DISH_ROUTE =
    ADMIN_BASE_ROUTE + "/dishes/:id/edit"

export const ADMIN_CATEGORIES_ROUTE = ADMIN_BASE_ROUTE + "/categories"    
export const ADMIN_CREATE_CATEGORY_ROUTE = ADMIN_BASE_ROUTE + "/categories/create"
export const ADMIN_EDIT_CATEGORY_ROUTE = ADMIN_BASE_ROUTE + "/categories/:id/edit"