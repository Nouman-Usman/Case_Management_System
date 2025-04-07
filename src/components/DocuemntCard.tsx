"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText } from "lucide-react";

interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  tag?: string;
  className?: string;
}

const DocumentCard = ({ id, title, description, tag, className }: DocumentCardProps) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300",
        "hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-primary/10 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[1.5] group-hover:bg-primary/5"></div>
      
      {tag && (
        <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground mb-4">
          {tag}
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <FileText className="w-5 h-5" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold leading-tight text-foreground mb-1">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
          
          <Link 
            href={`/templates?id=${id}`}
            className="inline-flex items-center mt-4 text-sm font-medium text-primary group/link"
          >
            <span className="relative transition-all duration-300 ease-in">
              Use template
              <span className="absolute inset-x-0 -bottom-px h-px bg-current opacity-0 transition-all group-hover/link:opacity-100"></span>
            </span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 ease-out group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
