import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZNYCLC79ZL"
        strategy="afterInteractive"
      />

      {/* Initialize Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZNYCLC79ZL');
        `}
      </Script>
      <Script strategy="afterInteractive" id="clarity" type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qxbagzg8yj");
`}
      </Script>
    </>
  );
}
