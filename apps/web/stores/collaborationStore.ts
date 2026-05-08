import { create } from 'zustand';

type CollaborationStore = {
  activeCollaborators: string[];
  setCollaborators: (collaborators: string[]) => void;
};

export const useCollaborationStore = create<CollaborationStore>((set) => ({
  activeCollaborators: ['Maya', 'Arjun'],
  setCollaborators: (activeCollaborators) => set({ activeCollaborators }),
}));
