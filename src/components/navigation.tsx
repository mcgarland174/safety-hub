import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Pill, AlertCircle, BarChart3, Shield, Menu, X, Check, FileText } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSubstancesDropdown, setShowSubstancesDropdown] = useState(false);

  const navItems = [
    {
      id: 'home',
      path: '/',
      label: 'Home',
      icon: Home,
      color: '#003B73'
    },
    {
      id: 'substances',
      path: '/substances',
      label: 'Substances',
      icon: Pill,
      color: '#E6543E',
      dropdown: [
        {
          id: 'comparison',
          path: '/comparison',
          label: 'Compare Substances',
          icon: BarChart3
        }
      ]
    },
    {
      id: 'conditions',
      path: '/conditions',
      label: 'Conditions',
      icon: AlertCircle,
      color: '#F4B63A'
    },
    {
      id: 'practices',
      path: '/practices',
      label: 'Harm Reduction',
      icon: Shield,
      color: '#47A8E0'
    },
    {
      id: 'case-studies',
      path: '/case-studies',
      label: 'Case Studies',
      icon: FileText,
      color: '#A33D2C'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isActiveGroup = (item: any) => {
    if (isActive(item.path)) return true;
    if (item.dropdown) {
      return item.dropdown.some((sub: any) => isActive(sub.path));
    }
    return false;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowSubstancesDropdown(false);
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <nav className="sticky top-0 z-50 bg-[#FFF9F5] border-b border-[#E8D9C8] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo / Brand */}
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/PSI Logo Black - small.png" alt="PSI Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-xl text-[#2C1B11]" style={{fontFamily: 'Satoshi, sans-serif'}}>
                  Psychedelic Safety Hub
                </span>
                <span className="text-xs text-[#6C3000] -mt-0.5" style={{fontFamily: 'Inter, sans-serif', fontWeight: 500}}>Evidence-Based Harm Reduction</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActiveGroup(item);
                const hasDropdown = item.dropdown && item.dropdown.length > 0;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => hasDropdown && item.id === 'substances' && setShowSubstancesDropdown(true)}
                    onMouseLeave={() => hasDropdown && item.id === 'substances' && setShowSubstancesDropdown(false)}
                  >
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center space-x-2 px-6 py-2.5 rounded-[12px]
                        transition-all duration-200 font-semibold
                        ${active
                          ? 'text-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]'
                          : 'text-[#4E4E4E] hover:bg-[#FEEAD8]'
                        }
                      `}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        ...(active ? { backgroundColor: item.color } : {})
                      }}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : ''}`} style={!active ? {color: item.color} : {}} />
                      <span className="text-sm">{item.label}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {hasDropdown && showSubstancesDropdown && item.id === 'substances' && (
                      <div
                        className="absolute top-full mt-1 left-0 bg-white rounded-[12px] shadow-lg border-2 border-[#E8D9C8] py-2 min-w-[200px] z-50"
                      >
                        {item.dropdown.map((subItem: any) => {
                          const SubIcon = subItem.icon;
                          const subActive = isActive(subItem.path);
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleNavigation(subItem.path)}
                              className={`
                                w-full flex items-center space-x-2 px-4 py-2.5
                                transition-all duration-200 font-semibold text-left
                                ${subActive
                                  ? 'bg-[#E6543E] text-white'
                                  : 'text-[#4E4E4E] hover:bg-[#FEEAD8]'
                                }
                              `}
                              style={{fontFamily: 'Inter, sans-serif'}}
                            >
                              <SubIcon className={`w-4 h-4 ${subActive ? 'text-white' : ''}`} style={!subActive ? {color: '#007F6E'} : {}} />
                              <span className="text-sm">{subItem.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Emergency Button */}
              <button
                onClick={() => setShowEmergency(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-all duration-200 ml-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">EMERGENCY</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-[12px] hover:bg-[#FEEAD8] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2C1B11]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2C1B11]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8D9C8] bg-[#FFF9F5]">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActiveGroup(item);
                const hasDropdown = item.dropdown && item.dropdown.length > 0;

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-[12px]
                        transition-all duration-200 font-semibold
                        ${active
                          ? 'text-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]'
                          : 'text-[#4E4E4E] hover:bg-[#FEEAD8]'
                        }
                      `}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        ...(active ? { backgroundColor: item.color } : {})
                      }}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} style={!active ? {color: item.color} : {}} />
                      <span>{item.label}</span>
                    </button>

                    {/* Mobile Dropdown Items */}
                    {hasDropdown && item.dropdown.map((subItem: any) => {
                      const SubIcon = subItem.icon;
                      const subActive = isActive(subItem.path);
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`
                            w-full flex items-center space-x-3 px-8 py-2.5 rounded-[12px]
                            transition-all duration-200 font-medium
                            ${subActive
                              ? 'text-white bg-[#007F6E]'
                              : 'text-[#4E4E4E] hover:bg-[#FEEAD8]'
                            }
                          `}
                          style={{fontFamily: 'Inter, sans-serif'}}
                        >
                          <SubIcon className={`w-4 h-4 ${subActive ? 'text-white' : ''}`} style={!subActive ? {color: '#007F6E'} : {}} />
                          <span className="text-sm">{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {/* Emergency Button - Mobile */}
              <button
                onClick={() => {
                  setShowEmergency(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-all duration-200"
              >
                <AlertCircle className="w-5 h-5" />
                <span>EMERGENCY CRISIS PROTOCOL</span>
              </button>
            </div>
          </div>
        )}
      </nav>


      {/* Emergency Crisis Protocol Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-red-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle size={24} />
                <h2 className="text-xl font-bold">Emergency Crisis Protocol</h2>
              </div>
              <button onClick={() => setShowEmergency(false)} className="hover:bg-red-600 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="font-bold text-red-900 mb-2">First Line: Non-Pharmacological</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Reassurance:</strong> "You are safe. This is temporary. What you're experiencing is from the substance."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Breathing:</strong> Guide slow, deep breaths. "Breathe in for 4, hold for 4, out for 4."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Grounding:</strong> "Feel your feet on the ground. Notice the sounds around you."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 text-red-500 flex-shrink-0" />
                    <span><strong>Environment:</strong> Move to quiet area, dim lights, reduce stimulation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 text-white p-4 rounded">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Crisis Helplines
                </h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Suicide Crisis Lifeline:</strong> Call 988</li>
                  <li><strong>Fireside Project:</strong> Psychedelic Peer Support (62FIRESIDE / 623-473-7433)</li>
                  <li><strong>Emergency Services:</strong> Call 911 if severe physiological symptoms, suicidal behavior, or uncontrolled violence</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <h3 className="font-bold text-orange-900 mb-2">When to Call Emergency Services</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Chest pain, seizure, or severe hyperthermia</li>
                  <li>• Suicidal ideation or behavior</li>
                  <li>• Violent or dangerous behavior</li>
                  <li>• Condition does not improve with interventions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
