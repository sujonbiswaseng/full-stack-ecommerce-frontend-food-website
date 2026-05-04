import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/services/auth.service";
import { TUser } from "@/types/user.type";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const userinfo = await getSession();
  const result = userinfo?.data;

  return (
    <div className="max-w-[1480px] mx-auto">
      <Navbar user={result as TUser} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout