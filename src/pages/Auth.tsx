import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: t('error'), description: t('fillAllFields'), variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const result = isLogin ? await signIn(email, password) : await signUp(email, password, displayName);
      if (result.error) toast({ title: t('error'), description: result.error.message, variant: 'destructive' });
      else if (!isLogin) {
        toast({ title: t('success'), description: t('accountCreated') });
        setIsLogin(true);
      }
    } catch {
      toast({ title: t('error'), description: t('somethingWentWrong'), variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) toast({ title: t('error'), description: error.message, variant: 'destructive' });
    } catch {
      toast({ title: t('error'), description: t('somethingWentWrong'), variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
        <HelmetProvider>
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
     <Helmet>
              <title>Moroccan Craft Gift - Authentic Moroccan Handicrafts</title>
               <link rel="icon" href="https://moroccancraftgift.com/download.png" />
    
    <link rel="icon" href="https://moroccancraftgift.com/favicon-64x64.png" sizes="64x64" type="image/png" />
    <link rel="apple-touch-icon" sizes="180x180" href="https://moroccancraftgift.com/apple-touch-icon.png" />
    
      <link rel="canonical" href="https://moroccancraftgift.com/" />
    
              <meta
                name="description"
                content="Discover authentic Moroccan handicrafts and artisan gifts. Handmade poufs, lamps, copperware, and decorative items."
              />
              <meta
                name="keywords"
                content="Moroccan handicrafts, poufs, lamps, copperware, artisan gifts"
              />
              <meta name="author" content="Moroccan Craft Gift" />
              <meta property="og:title" content="Moroccan Craft Gift - Authentic Moroccan Handicrafts" />
              <meta property="og:description" content="Discover authentic Moroccan handicrafts and artisan gifts." />
              <meta property="og:image" content="https://moroccancraftgift.com/logo.png" />
              <meta property="og:url" content="https://moroccancraftgift.com/" />
              <link rel="canonical" href="https://moroccancraftgift.com/" />
    
              {/* Structured Data JSON-LD */}
              <script type="application/ld+json">
                {`
                {
                  "@context": "https://schema.org",
                  "@type": "Store",
                  "name": "Moroccan Craft Gift",
                  "image": "https://moroccancraftgift.com/logo.png",
                  "description": "Authentic Moroccan handicrafts and artisan gifts",
                  "url": "https://moroccancraftgift.com",
                  "sameAs": [
                    "https://www.facebook.com/profile.php?id=61578327795179",
                    "https://www.instagram.com/moroccan.craft.gift/"
                  ]
                }
                `}
              </script>
            </Helmet>
    
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> {t('backToHome')}
        </Link>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isLogin ? t('signIn') : t('signUp')}
            </CardTitle>
            <CardDescription>{isLogin ? t('signInDescription') : t('signUpDescription')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={handleGoogleSignIn}>
              {t('continueWithGoogle')}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('orContinueWith')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="displayName">{t('displayName')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="displayName" type="text" placeholder={t('enterDisplayName')} value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-10" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder={t('enterEmail')} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder={t('enterPassword')} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? t('loading') : isLogin ? t('signIn') : t('signUp')}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
                {isLogin ? t('signUp') : t('signIn')}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
        </HelmetProvider>
    
  );
};

export default Auth;
