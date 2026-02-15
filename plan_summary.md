The "Hero CTA" now redirects the user to the `/contact` page.

**Changes Made:**
- Modified `src/app/pages/LandingPage.tsx` to:
    - Import `useNavigate` from `react-router-dom`.
    - Use the `useNavigate` hook to get the `navigate` function.
    - Create a new `handleCTAClick` function that calls `navigate('/contact')`.
    - Update the `HeroSection`'s `onCTAClick` prop to `handleCTAClick`.

**Verification:**
- The development server was started (`npm run dev`).
- The user confirmed that clicking the "Begin Your Journey" button in the hero section successfully redirects to the `/contact` page.
- The development server has been stopped.