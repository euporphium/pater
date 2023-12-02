CREATE TABLE profiles (
    id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    last_modified TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    PRIMARY KEY (id)
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public profiles are viewable by everyone."
    ON profiles FOR SELECT
    USING ( TRUE );

CREATE POLICY "users can insert their own profile."
    ON profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

CREATE POLICY "users can update own profile."
    ON profiles FOR UPDATE
    USING ( auth.uid() = id );

CREATE FUNCTION update_last_modified()
    RETURNS TRIGGER
AS $$
BEGIN
    NEW.last_modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_last_modified
    BEFORE UPDATE
    ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();

CREATE FUNCTION handle_new_user()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = public
AS $$
BEGIN
    INSERT INTO profiles (id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();