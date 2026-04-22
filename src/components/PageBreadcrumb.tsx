import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 md:mb-8"
    >
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Breadcrumb Items */}
          {items.map((item, index) => (
            <div key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <BreadcrumbSeparator className="!m-0">
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-foreground font-medium">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
}
