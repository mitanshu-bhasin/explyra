
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  inactivity_days INTEGER NOT NULL DEFAULT 90,
  is_inactive BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Nominees table
CREATE TABLE public.nominees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  relationship TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own nominees" ON public.nominees FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own nominees" ON public.nominees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own nominees" ON public.nominees FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own nominees" ON public.nominees FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_nominees_updated_at BEFORE UPDATE ON public.nominees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Capsules table
CREATE TABLE public.capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL DEFAULT 'password',
  title TEXT NOT NULL,
  encrypted_content TEXT NOT NULL DEFAULT '',
  nominee_id UUID REFERENCES public.nominees(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.capsules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own capsules" ON public.capsules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own capsules" ON public.capsules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own capsules" ON public.capsules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own capsules" ON public.capsules FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_capsules_updated_at BEFORE UPDATE ON public.capsules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Heartbeats table
CREATE TABLE public.heartbeats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.heartbeats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own heartbeats" ON public.heartbeats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own heartbeats" ON public.heartbeats FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Security logs table
CREATE TABLE public.security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  ip_address TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own security logs" ON public.security_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own security logs" ON public.security_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
