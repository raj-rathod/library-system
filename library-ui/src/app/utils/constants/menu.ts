import { Menu } from "../../models/menu.interface";

export const AMDIN_MENU:Menu[] = [
    {
        moduleName: "Users",
        route: "/admin/users",
        isActive:true
    },
     {
        moduleName: "Books",
        route: "/admin/books",
        isActive:false
    },
     {
        moduleName: "Transactions",
        route: "/admin/borrowed-books",
        isActive: false
    },
     {
        moduleName: "Departments",
        route: "/admin/departments",
        isActive: false
    }
]

export const LIBRARIAN_MENU:Menu[] = [
    {
        moduleName: "Books",
        route: "/librarian/books",
        isActive:false
    },
     {
        moduleName: "Borrows",
        route: "/librarian/borrowed-books",
        isActive: false
    },
    {
        moduleName: "Departments",
        route: "/librarian/departments",
        isActive: false
    }
]

export const USER_MENU:Menu[] = [
    {
        moduleName: "Books",
        route: "/user/books",
        isActive:true
    },
    {
        moduleName: "Transactions",
        route: "/user/borrowed-books",
        isActive: false
    }
]