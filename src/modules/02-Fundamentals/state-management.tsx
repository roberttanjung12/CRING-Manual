'use client';

import { useState } from 'react';
import { Typography, Alert, Card, CardContent, Stack, Box, Tabs, Tab } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const StateManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tableOfContents = [
    { id: 'overview', title: 'State Management Overview' },
    { id: 'redux-setup', title: 'Redux Toolkit Setup' },
    { id: 'rtk-query', title: 'RTK Query for APIs' },
    { id: 'local-state', title: 'Local State Patterns' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="State Management"
      description="Redux Toolkit, RTK Query, dan state management patterns di CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Routing & Navigation',
          href: '/fundamentals/routing-navigation'
        },
        next: {
          title: 'Components Overview',
          href: '/components'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          State Management Architecture
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan <strong>Redux Toolkit</strong> sebagai primary state management solution,
          dikombinasikan dengan <strong>RTK Query</strong> untuk efficient data fetching dan caching.
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="redux" style={{ color: '#764ABC' }} />
                State Management Stack
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Icon icon="redux" style={{ color: '#764ABC', fontSize: '20px' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Redux Toolkit
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Simplified Redux dengan built-in best practices
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Icon icon="api" style={{ color: '#FF6B35', fontSize: '20px' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      RTK Query
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Powerful data fetching dengan automatic caching
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Icon icon="react" style={{ color: '#61DAFB', fontSize: '20px' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      React Hooks
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Local state dengan useState, useReducer, dan custom hooks
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Alert severity="info">
            <strong>Why Redux Toolkit?</strong> Mengurangi boilerplate, built-in immutability dengan Immer, excellent
            DevTools integration, dan TypeScript support yang sangat baik.
          </Alert>
        </Stack>
      </section>

      {/* Redux Setup */}
      <section id="redux-setup">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Redux Toolkit Setup
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🏗️ Store Configuration
            </Typography>

            <CodeBlock
              language="typescript"
              title="src/store/index.ts"
              code={`import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './api/baseApi'
import authSlice from './slices/authSlice'
import appSlice from './slices/appSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    // API slice
    [baseApi.reducerPath]: baseApi.reducer,
    
    // Feature slices
    auth: authSlice,
    app: appSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [baseApi.util.getRunningQueryThunk.type],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// Enable listener behavior for the store
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔧 Creating Slices
            </Typography>

            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
              <Tab label="Auth Slice" />
              <Tab label="App Slice" />
              <Tab label="User Slice" />
            </Tabs>

            {activeTab === 0 && (
              <CodeBlock
                language="typescript"
                title="src/store/slices/authSlice.ts"
                code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError 
} = authSlice.actions

export default authSlice.reducer`}
              />
            )}

            {activeTab === 1 && (
              <CodeBlock
                language="typescript"
                title="src/store/slices/appSlice.ts"
                code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  notifications: Notification[]
  loading: boolean
  currentPage: string
}

const initialState: AppState = {
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
  loading: false,
  currentPage: '',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notif => notif.id !== action.payload
      )
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
  },
})

export const {
  toggleTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  setLoading,
  setCurrentPage,
} = appSlice.actions

export default appSlice.reducer`}
              />
            )}

            {activeTab === 2 && (
              <CodeBlock
                language="typescript"
                title="src/store/slices/userSlice.ts"
                code={`import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  profile: UserProfile | null
  preferences: UserPreferences
  recentActivity: Activity[]
  loading: boolean
}

const initialState: UserState = {
  profile: null,
  preferences: {
    language: 'id',
    timezone: 'Asia/Jakarta',
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
  },
  recentActivity: [],
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      }
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.recentActivity.unshift(action.payload)
      // Keep only last 50 activities
      if (state.recentActivity.length > 50) {
        state.recentActivity = state.recentActivity.slice(0, 50)
      }
    },
    clearActivity: (state) => {
      state.recentActivity = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  setProfile,
  updatePreferences,
  addActivity,
  clearActivity,
  setLoading,
} = userSlice.actions

export default userSlice.reducer`}
              />
            )}
          </Box>
        </Stack>
      </section>

      {/* RTK Query */}
      <section id="rtk-query">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          RTK Query for API Management
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🌐 Base API Setup
            </Typography>

            <CodeBlock
              language="typescript"
              title="src/store/api/baseApi.ts"
              code={`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    prepareHeaders: (headers, { getState }) => {
      // Add auth token to requests
      const state = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set('authorization', \`Bearer \${token}\`)
      }

      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: [
    'User', 
    'Post', 
    'Comment', 
    'Transaction', 
    'Merchant'
  ],
  endpoints: () => ({}),
})

export const {} = baseApi`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔄 API Endpoints
            </Typography>

            <CodeBlock
              language="typescript"
              title="src/store/api/userApi.ts"
              code={`import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => \`/users/\${userId}\`,
      providesTags: ['User'],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<UserProfile, { 
      id: string; 
      data: Partial<UserProfile> 
    }>({
      query: ({ id, data }) => ({
        url: \`/users/\${id}\`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Get users list with pagination
    getUsers: builder.query<{
      users: User[];
      total: number;
      page: number;
    }, {
      page?: number;
      limit?: number;
      search?: string;
    }>({
      query: ({ page = 1, limit = 10, search }) => ({
        url: '/users',
        params: { page, limit, search },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User', id } as const)),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: \`/users/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userApi`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎯 Using RTK Query in Components
            </Typography>

            <CodeBlock
              language="typescript"
              title="Component with RTK Query"
              code={`import { useGetUsersQuery, useDeleteUserMutation } from '@/store/api/userApi'
import { useState } from 'react'

function UsersList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  // Query hook with automatic caching
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery({ 
    page, 
    search,
    limit: 20 
  }, {
    // Additional options
    pollingInterval: 30000, // Poll every 30 seconds
    skip: false, // Skip query if needed
    refetchOnMountOrArgChange: true,
  })

  // Mutation hook
  const [deleteUser, { 
    isLoading: isDeleting,
    error: deleteError 
  }] = useDeleteUserMutation()

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap()
      // Success - cache will be automatically invalidated
      console.log('User deleted successfully')
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1) // Reset to first page
  }

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <SearchInput 
        value={search}
        onChange={handleSearch}
        placeholder="Search users..."
      />

      <div className="users-grid">
        {usersData?.users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => handleDelete(user.id)}
            isDeleting={isDeleting}
          />
        ))}
      </div>

      <Pagination
        current={page}
        total={usersData?.total || 0}
        pageSize={20}
        onChange={setPage}
      />
      
      <button onClick={() => refetch()}>
        Refresh Data
      </button>
    </div>
  )
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Local State */}
      <section id="local-state">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Local State Management Patterns
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎣 Custom Hooks for State Logic
            </Typography>

            <CodeBlock
              language="typescript"
              title="src/hooks/useFormState.ts"
              code={`import { useState, useCallback } from 'react'

interface UseFormStateOptions<T> {
  initialValues: T
  validate?: (values: T) => Record<keyof T, string>
  onSubmit?: (values: T) => Promise<void> | void
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormStateOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  const validateForm = useCallback(() => {
    if (!validate) return true

    const validationErrors = validate(values)
    setErrors(validationErrors)
    
    return Object.keys(validationErrors).length === 0
  }, [values, validate])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit?.(values)
      // Reset form after successful submission
      setValues(initialValues)
      setErrors({})
      setTouched({})
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm, onSubmit, initialValues])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0,
  }
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🧠 useReducer for Complex State
            </Typography>

            <CodeBlock
              language="typescript"
              title="Complex state with useReducer"
              code={`import { useReducer, useCallback } from 'react'

// State interface
interface DataTableState {
  data: any[]
  filteredData: any[]
  loading: boolean
  error: string | null
  filters: {
    search: string
    category: string
    status: string
  }
  sorting: {
    field: string
    direction: 'asc' | 'desc'
  }
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  selectedRows: string[]
}

// Action types
type DataTableAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: any[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTER'; payload: { field: keyof DataTableState['filters']; value: string } }
  | { type: 'SET_SORTING'; payload: { field: string; direction: 'asc' | 'desc' } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'TOGGLE_ROW_SELECTION'; payload: string }
  | { type: 'SELECT_ALL_ROWS'; payload: string[] }
  | { type: 'CLEAR_SELECTION' }

// Reducer function
function dataTableReducer(
  state: DataTableState, 
  action: DataTableAction
): DataTableState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
        loading: false,
        error: null,
      }

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }

    case 'SET_FILTER':
      const newFilters = {
        ...state.filters,
        [action.payload.field]: action.payload.value,
      }
      
      // Apply filters
      const filteredData = state.data.filter(item => {
        const matchesSearch = !newFilters.search || 
          item.name.toLowerCase().includes(newFilters.search.toLowerCase())
        const matchesCategory = !newFilters.category || 
          item.category === newFilters.category
        const matchesStatus = !newFilters.status || 
          item.status === newFilters.status
        
        return matchesSearch && matchesCategory && matchesStatus
      })

      return {
        ...state,
        filters: newFilters,
        filteredData,
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
      }

    case 'SET_SORTING':
      const sortedData = [...state.filteredData].sort((a, b) => {
        const aVal = a[action.payload.field]
        const bVal = b[action.payload.field]
        
        if (action.payload.direction === 'asc') {
          return aVal > bVal ? 1 : -1
        } else {
          return aVal < bVal ? 1 : -1
        }
      })

      return {
        ...state,
        sorting: action.payload,
        filteredData: sortedData,
      }

    case 'TOGGLE_ROW_SELECTION':
      const rowId = action.payload
      const isSelected = state.selectedRows.includes(rowId)
      
      return {
        ...state,
        selectedRows: isSelected
          ? state.selectedRows.filter(id => id !== rowId)
          : [...state.selectedRows, rowId],
      }

    default:
      return state
  }
}

// Custom hook
export function useDataTable(initialData: any[] = []) {
  const [state, dispatch] = useReducer(dataTableReducer, {
    data: initialData,
    filteredData: initialData,
    loading: false,
    error: null,
    filters: { search: '', category: '', status: '' },
    sorting: { field: 'name', direction: 'asc' },
    pagination: { page: 1, pageSize: 10, total: 0 },
    selectedRows: [],
  })

  // Action creators
  const setData = useCallback((data: any[]) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }, [])

  const setFilter = useCallback((field: keyof DataTableState['filters'], value: string) => {
    dispatch({ type: 'SET_FILTER', payload: { field, value } })
  }, [])

  const setSorting = useCallback((field: string, direction: 'asc' | 'desc') => {
    dispatch({ type: 'SET_SORTING', payload: { field, direction } })
  }, [])

  const toggleRowSelection = useCallback((rowId: string) => {
    dispatch({ type: 'TOGGLE_ROW_SELECTION', payload: rowId })
  }, [])

  return {
    state,
    actions: {
      setData,
      setFilter,
      setSorting,
      toggleRowSelection,
    },
  }
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Best Practices */}
      <section id="best-practices">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          State Management Best Practices
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                ✅ Do These
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Keep State Shape Flat
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avoid deeply nested state. Use normalized data structures untuk complex relationships.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Use RTK Query for Server State
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Let RTK Query handle caching, synchronization, dan error handling untuk API data.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Colocate State with Components
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gunakan local state (useState) untuk UI state yang tidak perlu di-share.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Type Everything
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gunakan TypeScript untuk semua state interfaces dan action types.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'error.main' }}>
                ❌ Avoid These
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Storing Everything in Redux
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jangan simpan form state, UI toggles, atau temporary data di Redux.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Mutating State Directly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Selalu return new state objects. Redux Toolkit uses Immer untuk prevent mutations.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Over-fetching Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gunakan RTK Query's selective data fetching dan caching untuk optimize performance.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Alert severity="success">
            <strong>Pro Tip:</strong> Install Redux DevTools extension untuk debugging. RTK Query juga punya built-in
            DevTools integration yang sangat helpful untuk monitoring API calls dan cache state.
          </Alert>
        </Stack>
      </section>
    </DocumentationPageLayout>
  );
};

export default StateManagementPage;
