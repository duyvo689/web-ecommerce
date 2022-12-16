import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vktrkliafqixinekthmv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrdHJrbGlhZnFpeGluZWt0aG12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyMDcyNzIsImV4cCI6MTk4Njc4MzI3Mn0.ui65zcGjXNBQQO64ZbBu14Qyss1XK0zVHlcUGbq_1S8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
