import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button asChild className="group flex items-center text-lg">
        <Link to="/login">
          Login <ArrowRight size={16} className=" group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
