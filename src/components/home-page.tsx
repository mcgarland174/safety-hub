import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, Search, BookOpen, Users, BarChart3, ArrowRight, Info, Heart, Brain, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const tools = [
    {
      id: 'substances',
      title: 'Substance Explorer',
      icon: Search,
      color: '#E6543E',
      description: 'Deep dive into individual substances with safety data, contraindications, and adverse event profiles.',
      badge: 'Most Detailed'
    },
    {
      id: 'conditions',
      title: 'Condition Explorer',
      icon: AlertCircle,
      color: '#F4B63A',
      description: 'Search for a medical condition or medication to understand contraindications across all substances.',
      badge: 'Start Here'
    },
    {
      id: 'comparison',
      title: 'Substance Comparison',
      icon: BarChart3,
      color: '#007F6E',
      description: 'Compare safety profiles side-by-side to understand relative risks and unique considerations.',
      badge: 'Quick Overview'
    },
    {
      id: 'practices',
      title: 'Harm Reduction Practice Database',
      icon: Shield,
      color: '#003B73',
      description: 'Evidence-based practices for minimizing risks across all phases: preparation, session, and integration.',
      badge: 'Essential Reading'
    }
  ];

  const stats = [
    { label: 'Medical Conditions', value: '30+', icon: AlertCircle },
    { label: 'Substances Covered', value: '9', icon: Sparkles },
    { label: 'Harm Reduction Practices', value: '25+', icon: Shield },
    { label: 'Evidence-Based', value: '100%', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#003B73]"></div>

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 md:py-28">
          <div className="text-center text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-[12px] text-sm font-semibold mb-4" style={{fontFamily: 'Inter, sans-serif'}}>
              <Shield className="w-4 h-4" />
              <span>Evidence-Based Harm Reduction</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{fontFamily: 'Satoshi, sans-serif'}}>
              Psychedelic Safety Hub
            </h1>

            <p className="text-xl md:text-2xl text-[#F7DCC3] max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
             Evidence-based information to help you understand risks, contraindications, and harm reduction practices for psychedelic substances.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => navigate('/substances')}
                className="group px-8 py-4 bg-white rounded-[12px] font-semibold text-lg shadow-[0_6px_18px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center space-x-2"
                style={{fontFamily: 'Inter, sans-serif', color: '#003B73'}}
              >
                <span>Explore Substances</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/conditions')}
                className="px-8 py-4 bg-[#007F6E] backdrop-blur-sm text-white rounded-[12px] font-semibold text-lg border-2 border-white/30 hover:opacity-90 transition-all"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                Check Your Condition
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C1B11] mb-4" style={{fontFamily: 'Satoshi, sans-serif'}}>
            Choose Your Path
          </h2>
          <p className="text-lg text-[#4E4E4E] max-w-2xl mx-auto" style={{fontFamily: 'Inter, sans-serif'}}>
            Four specialized tools to help you make informed decisions about psychedelic safety
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden border-2 border-[#E8D9C8] hover:border-[#FCA300]"
              >
                <div className="h-2" style={{backgroundColor: tool.color}}></div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-[12px] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]" style={{backgroundColor: tool.color}}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#2C1B11] mb-3" style={{fontFamily: 'Satoshi, sans-serif'}}>
                    {tool.title}
                  </h3>

                  <p className="text-[#4E4E4E] mb-6 leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                    {tool.description}
                  </p>

                  <button
                    onClick={() => navigate(`/${tool.id}`)}
                    className="w-full px-6 py-3 text-white rounded-[12px] font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center space-x-2"
                    style={{fontFamily: 'Inter, sans-serif', backgroundColor: tool.color}}
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crisis Helplines Banner */}
      <div className="max-w-[1280px] mx-auto px-6 pb-16">
        <div className="bg-[#E6543E] rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 text-white">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Crisis Helplines</h3>
              <p className="text-[#F7DCC3] mb-4" style={{fontFamily: 'Inter, sans-serif'}}>
                If you or someone you're with is experiencing a medical or psychological emergency, contact these resources immediately.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <a
                  href="tel:623-473-7433"
                  className="px-6 py-3 bg-white text-[#E6543E] rounded-[12px] font-semibold hover:bg-[#F5EBDD] transition-colors text-center"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <div className="text-sm mb-1">Fireside Project</div>
                  <div className="text-xs opacity-75">62-FIRESIDE</div>
                  <div className="text-xs opacity-75">(623) 473-7433</div>
                </a>
                <a
                  href="tel:988"
                  className="px-6 py-3 bg-white text-[#E6543E] rounded-[12px] font-semibold hover:bg-[#F5EBDD] transition-colors text-center"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <div className="text-sm mb-1">Suicide & Crisis</div>
                  <div className="text-lg font-bold">988</div>
                </a>
                <a
                  href="tel:911"
                  className="px-6 py-3 bg-white text-[#E6543E] rounded-[12px] font-semibold hover:bg-[#F5EBDD] transition-colors text-center"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  <div className="text-sm mb-1">Emergency Services</div>
                  <div className="text-lg font-bold">911</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-white border-t border-[#E8D9C8]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          {/* Medical Disclaimer */}
          <div className="bg-[#F7DCC3] border-2 border-[#E9D5B8] rounded-[24px] p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#F4B63A] rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#000000]" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-[#2C1B11] mb-2" style={{fontFamily: 'Satoshi, sans-serif'}}>Important Medical Disclaimer</h4>
                <p className="text-[#4E4E4E] leading-relaxed mb-3" style={{fontFamily: 'Inter, sans-serif'}}>
                  This tool is designed for educational and harm reduction purposes only. <strong>It does not constitute medical advice, diagnosis, or treatment.</strong> The information provided should not replace consultation with qualified healthcare professionals.
                </p>
                <p className="text-sm text-[#000000]/70 leading-relaxed" style={{fontFamily: 'Inter, sans-serif'}}>
                  If you have medical conditions, take medications, or are considering using psychedelic substances, consult with a licensed healthcare provider who can evaluate your individual circumstances. In case of emergency, call 911 or your local emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;