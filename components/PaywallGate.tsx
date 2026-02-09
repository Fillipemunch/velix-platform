
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface PaywallGateProps {
  children: React.ReactNode;
}

const PaywallGate: React.FC<PaywallGateProps> = ({ children }) => {
  // Logic bypassed: VELIX is now open and subsidized for all verified startups.
  return <>{children}</>;
};

export default PaywallGate;
