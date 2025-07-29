// import { useState, useEffect } from 'react';

// const WhatsAppSticky = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   // Show the button after scrolling down a bit
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
    
//     // Show immediately if already scrolled
//     toggleVisibility();
    
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const handleWhatsAppClick = () => {
//     console.log('🟢 WhatsApp button clicked!');
    
//     const phoneNumber = '212617869001';
//     const message = 'Salut! Je suis intéressé par vos services de studio d\'enregistrement.';
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
//     console.log('🟢 WhatsApp URL:', whatsappUrl);
    
//     window.open(whatsappUrl, '_blank');
//   };

//   if (!isVisible) return null;

//   return (
//     <>
//       {/* WhatsApp Floating Button */}
//       <div
//         className="fixed bottom-8 right-8 z-50 transition-all duration-300"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         style={{
//           transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)',
//           opacity: isVisible ? 1 : 0,
//         }}
//       >
//         {/* Main Button Container */}
//         <div
//           className="relative overflow-hidden rounded-full transition-all duration-500 ease-out cursor-pointer"
//           style={{
//             background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
//             boxShadow: isHovered 
//               ? '0 12px 35px rgba(37, 211, 102, 0.6)' 
//               : '0 8px 25px rgba(37, 211, 102, 0.4)',
//             width: isHovered ? '200px' : '64px',
//             height: '64px',
//             transform: isHovered ? 'scale(1.05)' : 'scale(1)',
//           }}
//           onClick={handleWhatsAppClick}
//         >
//           {/* Button Content */}
//           <div className="w-full h-full flex items-center justify-start px-4 text-white font-bold transition-all duration-300 hover:brightness-110">
//             {/* WhatsApp Icon */}
//             <div className="flex-shrink-0">
//               <svg
//                 className="w-8 h-8 text-white transition-transform duration-300"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
//               </svg>
//             </div>

//             {/* Expanding Text */}
//             <div
//               className={`ml-3 transition-all duration-500 ease-out overflow-hidden ${
//                 isHovered ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'
//               }`}
//               style={{
//                 transitionDelay: isHovered ? '200ms' : '0ms',
//               }}
//             >
//               <span 
//                 className="text-sm font-bold whitespace-nowrap"
//                 style={{ 
//                   fontFamily: 'Sequel Bold, system-ui, -apple-system, sans-serif',
//                   transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
//                   transition: 'transform 0.4s ease-out 0.3s'
//                 }}
//               >
//                 Contactez-nous
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Pulse Animation Rings */}
//         {!isHovered && (
//           <div className="absolute inset-0 rounded-full pointer-events-none">
//             <div 
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: 'rgba(37, 211, 102, 0.2)',
//                 animation: 'whatsapp-pulse 2.5s ease-out infinite',
//               }}
//             />
//             <div 
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: 'rgba(37, 211, 102, 0.15)',
//                 animation: 'whatsapp-pulse 2.5s ease-out infinite 0.8s',
//               }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes whatsapp-pulse {
//           0% {
//             transform: scale(1);
//             opacity: 0.8;
//           }
//           50% {
//             transform: scale(1.15);
//             opacity: 0.4;
//           }
//           100% {
//             transform: scale(1.3);
//             opacity: 0;
//           }
//         }

//         /* Mobile Responsive */
//         @media (max-width: 768px) {
//           .whatsapp-container {
//             bottom: 1.5rem !important;
//             right: 1.5rem !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .whatsapp-container {
//             bottom: 1rem !important;
//             right: 1rem !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default WhatsAppSticky;