// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cdnyjfctztnwewfvtlgb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbnlqZmN0enRud2V3ZnZ0bGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTQ5NjUsImV4cCI6MjA1Mjk3MDk2NX0.nKFie4TvUdU1rfElWxbMlFT7Wv8D5Q3ET2Vw2Z7j2lg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);