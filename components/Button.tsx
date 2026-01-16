import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-95";
  
  const variants = {
    primary: "bg-burgundy-500 text-white hover:bg-burgundy-600 focus:ring-burgundy-500/50 shadow-sm",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-800/50 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:ring-slate-400"
  };

  const sizes = {
    sm: "h-9 px-4 text-xs uppercase tracking-wider",
    md: "h-11 px-6 text-sm uppercase tracking-wider",
    lg: "h-14 px-8 text-base uppercase tracking-wider"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;