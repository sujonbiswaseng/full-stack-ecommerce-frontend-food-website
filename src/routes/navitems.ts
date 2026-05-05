interface NavItem {
    to: string;
    label: string;
    icon?: string;        // icon-এর name string
    authRequired?: boolean;
    roles?: string[];
  }
  
  export const navItems: NavItem[] = [
    { to: "/", label: "Home", icon: "Home" },
    { to: "/meals", label: "Meals", icon: "Utensils" },
    { to: "/blogs", label: "Blogs", icon: "BookOpen" },
    { to: "/about", label: "About", icon: "Info" },
    { to: "/contact", label: "Contact", icon: "Mail" },

    { 
      to: "/my-orders", 
      label: "orders", 
      icon: "ShoppingBag", 
 
      authRequired: true, 
      roles: ["Customer"]
    },
    { 
      to: "/admin/dashboard/categories", 
      label: "categories", 
      icon: "Store",
 
      authRequired: true, 
      roles: ["Admin"] 
    },
    { 
      to: "/provider/dashboard/my-menu", 
      label: "my-menu", 
      icon: "Utensils",
      authRequired: true, 
      roles: ["Provider"] 
    }
  ];