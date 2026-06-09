// import Navbar from '../../components/Navbar';
// import PageTransition from '../../components/PageTransition';
// import FriendsBoard from './FriendsBoard';
// import {siteConfig} from "@/siteConfig";

// export const metadata = {
//   title: "友链 | " + siteConfig.title,
//   description: "赛博空间里的有趣灵魂",
// };

// export default function FriendsPage() {
//   return (
//     <div className="min-h-screen relative pb-20">
//       <Navbar />
//       <PageTransition>
//         <div className="mt-28">
//           <FriendsBoard />
//         </div>
//       </PageTransition>
//     </div>
//   );
// }

// 取消友链页面，删除相关路由和导航链接，保留原有代码以备后续可能的复活需求
import { notFound } from 'next/navigation';

export default function FriendsPage() {
  notFound();
}