

import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboard.type";



export const getCommonNavItems = (role : UserRole) : NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            items : [
                {
                    title : "Home",
                    href : "/",
                    icon : "Home"
                },
                {
                    title : "Dashboard",
                    href : defaultDashboard,
                    icon : "LayoutDashboard"

                }
            ]
        }
    ]
}


export const providerNavItem: NavSection[] = [
    {
        title: "Meals Management",
        items: [
            {
                title: "Create meals",
                href: "/provider/dashboard/create-meals",
                icon: "PlusSquare"
            },
            {
                title: "my-menu",
                href: "/provider/dashboard/my-menu",
                icon: "List"
            }
        ]
    },
    {
        title: "Order Management",
        items: [
            {
                title: "orders",
                href: "/provider/dashboard/orders",
                icon: "ClipboardList"
            }
        ]
    },
    {
        title: "settings",
        items: [
            {
                title: "setting",
                href: "/provider/dashboard/setting",
                icon: "Settings"
           
            }
        ]
    },
];



export const adminNavItems: NavSection[] = [
    {
        title: "Categories Management",
        items: [
            {
                title: "create-category",
                href: "/admin/dashboard/create-category",
                icon: "Calendar"
            },
            {
                title: "categories",
                href: "/admin/dashboard/categories",
                icon: "Folder"
            },
        ]
    },
    {
        title: "Blog Management",
        items: [
            {
                title: "Blogs",
                href: "/admin/dashboard/blogs",
                icon: "FileText"
            },
            {
                title: "Create Blog",
                href: "/admin/dashboard/create-blog",
                icon: "PlusSquare"
            }
        ]
    },
    {
        title: "Highlight Management",
        items: [
            {
                title: "Highlights",
                href: "/admin/dashboard/highlights",
                icon: "FileText"
            },
            {
                title: "Create Highlight",
                href: "/admin/dashboard/create-highlight",
                icon: "PlusSquare"
            }
        ]
    },
    {
        title: "users Management",
        items: [
            {
                title: "users",
                href: "/admin/dashboard/users",
                icon: "UserCog"
            },
            {
                title: "Newsletter",
                href: "/admin/dashboard/newsletters",
                icon: "MailOpen"
            },
        ]
    },
    {
        title: "meals Management",
        items: [
            {
                title: "meals",
                href: "/admin/dashboard/meals",
                icon: "Utensils"
            },
        ]
    },
    {
        title: "order Management",
        items: [
            {
                title: "orders",
                href: "/admin/dashboard/orders",
                icon: "ShoppingCart"
           
            },
        ]
    },
    {
        title: "reviews Management",
        items: [
            {
                title: "reviews",
                href: "/admin/dashboard/reviews",
                icon: "Star"
            },
        ]
    },
    {
        title: "payment Management",
        items: [
            {
                title: "payment",
                href: "/admin/dashboard/payments",
                icon: "CreditCard"           
            },
        ]
    },
    {
        title: "settings",
        items: [
            {
                title: "setting",
                href: "/admin/dashboard/setting",
                icon: "Setting"
           
            }
        ]
    },
]


export const getNavItemsByRole = (role : UserRole) : NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "Admin":
            return [...commonNavItems, ...adminNavItems];

        case "Provider":
            return [...commonNavItems, ...providerNavItem];
    }


}