import { create } from 'zustand'
import { RegisterUser, UserResponse } from '../types/User.type'

interface UserStore {
  user: RegisterUser | null
  setUser: (user: RegisterUser | null) => void
  userResponse: UserResponse | null
  setUserResponse: (userResponse: UserResponse | null) => void
}


export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userResponse: null,
  setUserResponse: (userResponse) => set({ userResponse }),
}))
