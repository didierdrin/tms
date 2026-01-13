import { create } from 'zustand';

const useUIStore = create((set) => ({
    sidebarCollapsed: false,
    mobileMenuOpen: false,

    toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    closeMobileMenu: () => set({ mobileMenuOpen: false }),
    toggleMobileMenu: () => set(state => ({ mobileMenuOpen: !state.mobileMenuOpen }))
}));

export default useUIStore;
