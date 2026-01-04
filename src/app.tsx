import React, { useState, useEffect } from 'react';
import { 
  Save, Trash2, Printer, Plus, X, Target, Clock, Activity, 
  Users, Zap, CheckCircle, Layout, ArrowRight, Download, 
  HelpCircle, ChevronDown, ChevronUp, Smartphone, PieChart 
} from 'lucide-react';

// --- Helper Components ---

const ProgressBar = ({ percentage, colorClass = "bg-blue-600" }) => (
  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
    <div 
      className={`h-2 rounded-full transition-all duration-500 ${colorClass}`} 
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const CircularProgress = ({ percentage }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle
          className="text-slate-700"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="text-blue-500 transition-all duration-1000 ease-out"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">{Math.round(percentage)}%</span>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, progress }) => (
  <div className="mb-6 border-b border-slate-200 pb-4 break-inside-avoid">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg text-white print:bg-white print:text-blue-600 print:border print:border-blue-600">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      {progress !== undefined && (
        <div className="text-right hidden sm:block">
           <span className="text-xs font-semibold text-slate-500">{Math.round(progress)}% Complete</span>
           <div className="w-24">
             <ProgressBar percentage={progress} />
           </div>
        </div>
      )}
    </div>
    <p className="text-slate-600 text-sm md:text-base ml-14">{subtitle}</p>
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text", rows = 3 }) => (
  <div className="mb-4 break-inside-avoid">
    <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 bg-white print:border-slate-400"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 bg-white print:border-slate-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

// --- Modules ---

const VisionModule = ({ data, updateData, progress }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePowerGoalChange = (index, value) => {
    const newGoals = [...data.powerGoals];
    newGoals[index] = value;
    updateData('powerGoals', newGoals);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader 
        icon={Target} 
        title="Vision & Power Goals" 
        subtitle="Step 1: Define the Direction. Move from a broad vision to specific daily actions."
        progress={progress}
      />

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-slate-300 print:bg-white">
        <InputField 
          label="My North Star (SMART Vision)" 
          type="textarea"
          value={data.northStar}
          onChange={(val) => updateData('northStar', val)}
          placeholder="Specific, Measurable, Attainable, Realistic, Time-bound. E.g., 'By Dec 31, 2026, I have...'"
        />
      </div>

      <div className="break-inside-avoid">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Layout size={20} className="text-blue-600" />
            The 12 Power Goals (Annual Projects)
            </h3>
            <button 
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1 print:hidden"
            >
                {expanded ? (
                    <><ChevronUp size={16} /> Collapse</>
                ) : (
                    <><ChevronDown size={16} /> Show All 12</>
                )}
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
          {data.powerGoals.map((goal, index) => {
              // Progressive Disclosure: Show first 3 always, show rest if expanded
              if (!expanded && index >= 3) return null;
              
              return (
                <div key={index} className="relative animate-fadeIn">
                    <span className="absolute left-3 top-3 text-slate-400 text-xs font-mono">{index + 1}.</span>
                    <input
                    type="text"
                    className="w-full pl-8 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm print:border-slate-400"
                    value={goal}
                    onChange={(e) => handlePowerGoalChange(index, e.target.value)}
                    placeholder={`Power Goal #${index + 1}`}
                    />
                </div>
            );
          })}
        </div>
        {!expanded && (
            <div className="text-center mt-2 print:hidden">
                <p className="text-xs text-slate-400 italic">... 9 more goals hidden ...</p>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 print:bg-white print:border-slate-300">
          <InputField 
            label="The High-Impact Project" 
            value={data.highImpactProject}
            onChange={(val) => updateData('highImpactProject', val)}
            placeholder="The one project that unlocks the entire vision..."
          />
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 print:bg-white print:border-slate-300">
          <InputField 
            label="Daily MINS (Most Important Next Step)" 
            value={data.mins}
            onChange={(val) => updateData('mins', val)}
            placeholder="What is the single action I must take today?"
          />
        </div>
      </div>
    </div>
  );
};

const AuditModule = ({ data, updateData, progress }) => {
  const addRow = () => {
    updateData('auditLog', [...data.auditLog, { time: '', activity: '', energy: 'yellow', action: '' }]);
  };

  const removeRow = (index) => {
    const newLog = data.auditLog.filter((_, i) => i !== index);
    updateData('auditLog', newLog);
  };

  const updateRow = (index, field, value) => {
    const newLog = [...data.auditLog];
    newLog[index] = { ...newLog[index], [field]: value };
    updateData('auditLog', newLog);
  };

  const energyColors = {
    green: 'bg-green-100 border-green-300 text-green-800 print:bg-white print:border-slate-300',
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800 print:bg-white print:border-slate-300',
    red: 'bg-red-100 border-red-300 text-red-800 print:bg-white print:border-slate-300',
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader 
        icon={Clock} 
        title="Time & Energy Audit" 
        subtitle="Step 2: Audit where you are. Identify 'Red' tasks to delete or delegate."
        progress={progress}
      />
      
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-slate-300">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs print:bg-slate-200">
            <tr>
              <th className="p-4 w-32">Time Slot</th>
              <th className="p-4">Activity</th>
              <th className="p-4 w-32">Energy</th>
              <th className="p-4 w-48">Action</th>
              <th className="p-4 w-12 print:hidden"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 print:divide-slate-300">
            {data.auditLog.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors break-inside-avoid">
                <td className="p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-slate-200 rounded print:border-none"
                    value={row.time}
                    onChange={(e) => updateRow(index, 'time', e.target.value)}
                    placeholder="08:00 - 08:15"
                  />
                </td>
                <td className="p-2">
                  <input 
                    type="text" 
                    className="w-full p-2 border border-slate-200 rounded print:border-none"
                    value={row.activity}
                    onChange={(e) => updateRow(index, 'activity', e.target.value)}
                    placeholder="Checking emails..."
                  />
                </td>
                <td className="p-2">
                  <select 
                    className={`w-full p-2 border rounded appearance-none cursor-pointer font-medium ${energyColors[row.energy]} print:appearance-auto`}
                    value={row.energy}
                    onChange={(e) => updateRow(index, 'energy', e.target.value)}
                  >
                    <option value="green">Green (Gives)</option>
                    <option value="yellow">Yellow (Neutral)</option>
                    <option value="red">Red (Drains)</option>
                  </select>
                </td>
                <td className="p-2">
                  <select 
                    className="w-full p-2 border border-slate-200 rounded print:border-none"
                    value={row.action}
                    onChange={(e) => updateRow(index, 'action', e.target.value)}
                  >
                    <option value="">- Select -</option>
                    <option value="keep">Keep</option>
                    <option value="delete">Delete</option>
                    <option value="delegate">Delegate</option>
                    <option value="leverage">Leverage</option>
                  </select>
                </td>
                <td className="p-2 text-center print:hidden">
                  <button 
                    onClick={() => removeRow(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={addRow}
        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 print:hidden"
      >
        <Plus size={20} /> Add Time Block
      </button>

      <div className="mt-8 bg-slate-800 text-white p-6 rounded-xl print:bg-white print:text-black print:border print:border-slate-300 break-inside-avoid">
        <h4 className="font-bold mb-2 text-yellow-400 print:text-black">The 10/80/10 Rule for Delegation</h4>
        <p className="text-sm text-slate-300 print:text-slate-600">
          I handle the first 10% (Vision/Direction) and the last 10% (Review/Approval). 
          Someone or something else handles the middle 80% (Execution).
        </p>
      </div>
    </div>
  );
};

const SystemsModule = ({ data, updateData, progress }) => {
  const updateChecklist = (field, index) => {
    if (Array.isArray(data[field])) {
      const newList = [...data[field]];
      newList[index] = !newList[index];
      updateData(field, newList);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader 
        icon={Activity} 
        title="Daily Mastery System" 
        subtitle="Step 3: Create Daily Systems. Consistent execution beats motivation."
        progress={progress}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-slate-300">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full print:bg-black"></div>
            Night-Before Design
          </h3>
          <p className="text-xs text-slate-500 mb-4">What are my 3 key tasks for tomorrow?</p>
          <div className="space-y-3">
            <input type="text" className="w-full p-2 border-b border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="1. ________________" value={data.task1} onChange={(e) => updateData('task1', e.target.value)} />
            <input type="text" className="w-full p-2 border-b border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="2. ________________" value={data.task2} onChange={(e) => updateData('task2', e.target.value)} />
            <input type="text" className="w-full p-2 border-b border-slate-200 focus:border-blue-500 outline-none text-sm" placeholder="3. ________________" value={data.task3} onChange={(e) => updateData('task3', e.target.value)} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-slate-300">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full print:bg-black"></div>
            Morning Routine
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors print:bg-white print:p-0">
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" checked={data.morningAttack} onChange={(e) => updateData('morningAttack', e.target.checked)} />
              <span className="text-sm font-medium text-slate-700">First 90 Mins: Attack most important task (No distractions)</span>
            </label>
            
            <div className="pl-8 text-xs text-slate-500">
              <p className="mb-2 font-semibold">Pomodoro Tracker:</p>
              <label className="flex items-center gap-2 mb-1 cursor-pointer">
                <input type="checkbox" checked={data.pomodoro1} onChange={(e) => updateData('pomodoro1', e.target.checked)} /> Sprint 1 (25m work / 5m move)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={data.pomodoro2} onChange={(e) => updateData('pomodoro2', e.target.checked)} /> Sprint 2 (25m work / 5m move)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-white print:border-slate-300 break-inside-avoid">
        <h3 className="font-bold text-slate-800 mb-4">Power Goal Review (3x Daily)</h3>
        <div className="flex flex-wrap gap-6">
          {['Morning Review', 'Mid-day Review', 'Evening Review'].map((label, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${data.reviews[i] ? 'bg-green-500 border-green-500 text-white print:bg-black print:border-black' : 'border-slate-300 bg-white'}`}>
                {data.reviews[i] && <CheckCircle size={14} />}
              </div>
              <input type="checkbox" className="hidden" checked={data.reviews[i]} onChange={() => updateChecklist('reviews', i)} />
              <span className={`text-sm font-medium ${data.reviews[i] ? 'text-green-700 print:text-black' : 'text-slate-600'}`}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="break-inside-avoid">
        <InputField 
          label="Net Time Stacking" 
          placeholder="e.g., Doing 1-on-1 calls while walking..."
          value={data.netTime}
          onChange={(val) => updateData('netTime', val)}
        />
      </div>
    </div>
  );
};

const ScorecardModule = ({ data, updateData, progress }) => {
  const updateFriend = (index, field, value) => {
    const newFriends = [...data.friends];
    newFriends[index] = { ...newFriends[index], [field]: value };
    updateData('friends', newFriends);
  };

  const addFriend = () => {
    updateData('friends', [...data.friends, { name: '', growth: false, proud: false, trust: false, energy: 'neutral' }]);
  };

  const removeFriend = (index) => {
    updateData('friends', data.friends.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader 
        icon={Users} 
        title="Scorecard & Environment" 
        subtitle="Steps 5 & 6: Network, Boundaries, and Metrics. Measure growth and audit your circle."
        progress={progress}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500 print:shadow-none print:border-slate-300">
          <InputField 
            label="North Star Metric" 
            value={data.metric}
            onChange={(val) => updateData('metric', val)}
            placeholder="One specific metric tracked daily with aggression..."
          />
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500 print:shadow-none print:border-slate-300">
          <InputField 
            label="High-Stakes Accountability" 
            value={data.accountability}
            onChange={(val) => updateData('accountability', val)}
            placeholder="If I don't hit my goal, the consequence is..."
          />
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-white print:border-slate-300">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
          <span>Friend Inventory Audit</span>
          <button onClick={addFriend} className="text-xs bg-white border border-slate-300 px-3 py-1 rounded hover:bg-slate-100 print:hidden">+ Add Person</button>
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100 print:bg-slate-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3 text-center">Growth Journey?</th>
                <th className="p-3 text-center">Proud of?</th>
                <th className="p-3 text-center">Trust w/ Family?</th>
                <th className="p-3 text-center">Energy Type</th>
                <th className="p-3 print:hidden"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {data.friends.map((friend, i) => (
                <tr key={i} className="break-inside-avoid">
                  <td className="p-2"><input className="w-full p-1 border-b border-transparent focus:border-blue-500 outline-none print:border-none" placeholder="Name" value={friend.name} onChange={(e) => updateFriend(i, 'name', e.target.value)} /></td>
                  <td className="p-2 text-center"><input type="checkbox" checked={friend.growth} onChange={(e) => updateFriend(i, 'growth', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /></td>
                  <td className="p-2 text-center"><input type="checkbox" checked={friend.proud} onChange={(e) => updateFriend(i, 'proud', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /></td>
                  <td className="p-2 text-center"><input type="checkbox" checked={friend.trust} onChange={(e) => updateFriend(i, 'trust', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" /></td>
                  <td className="p-2">
                    <select className="w-full text-xs p-1 border rounded print:border-none" value={friend.energy} onChange={(e) => updateFriend(i, 'energy', e.target.value)}>
                      <option value="amplifier">Amplifier (+)</option>
                      <option value="neutral">Neutral</option>
                      <option value="vampire">Vampire (-)</option>
                    </select>
                  </td>
                  <td className="p-2 text-center print:hidden">
                    <button onClick={() => removeFriend(i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4 italic">
          Tip: If they are not a "Hell Yes", they are a "No". Protect your energy.
        </p>
      </div>
    </div>
  );
};

const LeverageModule = ({ data, updateData, progress }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader 
        icon={Zap} 
        title="4 C's of Leverage" 
        subtitle="Step 4: Create Leverage. Use Code, Content, Capital, and Collaboration to multiply output."
        progress={progress}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group print:shadow-none print:border-slate-300 break-inside-avoid">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-black text-blue-900">1</span>
          </div>
          <h3 className="font-bold text-blue-700 mb-2">Code (Automation/AI)</h3>
          <p className="text-xs text-slate-500 mb-4">Repetitive tasks to automate so I never have to do them again.</p>
          <textarea 
            className="w-full p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 print:bg-white print:border-slate-300"
            rows={4}
            placeholder="e.g., Use AI to draft weekly reports..."
            value={data.code}
            onChange={(e) => updateData('code', e.target.value)}
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group print:shadow-none print:border-slate-300 break-inside-avoid">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl font-black text-purple-900">2</span>
          </div>
          <h3 className="font-bold text-purple-700 mb-2">Content (Assets/SOPs)</h3>
          <p className="text-xs text-slate-500 mb-4">Assets created once that teach or perform a function forever.</p>
          <textarea 
            className="w-full p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 print:bg-white print:border-slate-300"
            rows={4}
            placeholder="e.g., Record a video SOP for onboarding..."
            value={data.content}
            onChange={(e) => updateData('content', e.target.value)}
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group print:shadow-none print:border-slate-300 break-inside-avoid">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-black text-green-900">3</span>
            </div>
            <h3 className="font-bold text-green-700 mb-2">Capital (Buy Back Time)</h3>
            <p className="text-xs text-slate-500 mb-4">Investments to hire help or tools to reclaim schedule.</p>
            <textarea 
              className="w-full p-3 bg-green-50 border border-green-100 rounded-lg text-sm focus:ring-2 focus:ring-green-500 print:bg-white print:border-slate-300"
              rows={4}
              placeholder="e.g., Hire a house cleaner to save 4 hours/week..."
              value={data.capital}
              onChange={(e) => updateData('capital', e.target.value)}
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group print:shadow-none print:border-slate-300 break-inside-avoid">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-black text-orange-900">4</span>
            </div>
            <h3 className="font-bold text-orange-700 mb-2">Collaboration (Delegation)</h3>
            <p className="text-xs text-slate-500 mb-4">Who can I collaborate with? (10/80/10 Rule)</p>
            <textarea 
              className="w-full p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 print:bg-white print:border-slate-300"
              rows={4}
              placeholder="Task: ______ | Who: ______"
              value={data.collaboration}
              onChange={(e) => updateData('collaboration', e.target.value)}
            />
          </div>
      </div>
    </div>
  );
};

// --- Mobile-First Execution Mode ---

const ExecutionMode = ({ data, updateData }) => {
    const updateChecklist = (field, index) => {
        if (Array.isArray(data[field])) {
          const newList = [...data[field]];
          newList[index] = !newList[index];
          updateData(field, newList);
        }
    };

    return (
        <div className="space-y-6 animate-slideUp max-w-lg mx-auto pb-20">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Execution Mode</h2>
                        <p className="text-slate-400 text-sm">Focus on today's actions</p>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg">
                        <Smartphone size={24} className="text-blue-400" />
                    </div>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <label className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 block">Daily MINS</label>
                    <textarea 
                        className="w-full bg-transparent text-lg font-medium outline-none text-white placeholder-slate-600 resize-none"
                        rows={2}
                        value={data.mins}
                        onChange={(e) => updateData('mins', e.target.value)}
                        placeholder="What is the ONE thing you must do today?"
                    />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Today's Priority Tasks</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex gap-3 items-center">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-xs">{num}</span>
                            <input 
                                type="text" 
                                className="w-full p-2 border-b border-slate-100 focus:border-blue-500 outline-none"
                                value={data[`task${num}`]} 
                                onChange={(e) => updateData(`task${num}`, e.target.value)}
                                placeholder="Task..."
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${data.morningAttack ? 'bg-green-50 border-green-500' : 'bg-white border-slate-200'}`}
                    onClick={() => updateData('morningAttack', !data.morningAttack)}
                >
                    <div className="flex justify-between items-start mb-2">
                        <Zap size={20} className={data.morningAttack ? 'text-green-600' : 'text-slate-400'} />
                        {data.morningAttack && <CheckCircle size={16} className="text-green-600" />}
                    </div>
                    <p className={`font-bold text-sm ${data.morningAttack ? 'text-green-800' : 'text-slate-600'}`}>90 Min Attack</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Pomodoros</p>
                    <div className="flex gap-2">
                         <div 
                            className={`flex-1 h-10 rounded-lg flex items-center justify-center cursor-pointer border transition-all ${data.pomodoro1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-300'}`}
                            onClick={() => updateData('pomodoro1', !data.pomodoro1)}
                        >1</div>
                         <div 
                            className={`flex-1 h-10 rounded-lg flex items-center justify-center cursor-pointer border transition-all ${data.pomodoro2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-300'}`}
                            onClick={() => updateData('pomodoro2', !data.pomodoro2)}
                        >2</div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Goal Reviews</h3>
                <div className="space-y-3">
                     {['Morning Review', 'Mid-day Review', 'Evening Review'].map((label, i) => (
                        <div 
                            key={i} 
                            className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${data.reviews[i] ? 'bg-green-100 text-green-800' : 'bg-slate-50 text-slate-500'}`}
                            onClick={() => updateChecklist('reviews', i)}
                        >
                            <span className="font-medium text-sm">{label}</span>
                            {data.reviews[i] ? <CheckCircle size={18} /> : <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />}
                        </div>
                     ))}
                </div>
            </div>
        </div>
    )
}

const FooterGuide = () => (
    <div className="mt-16 border-t border-slate-200 pt-10 print:break-before-page break-inside-avoid">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 print:border print:border-slate-300">
          <HelpCircle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quick Reference Guide</h2>
          <p className="text-slate-500 text-sm">How to use each template effectively</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="space-y-2">
          <h3 className="font-bold text-blue-600 flex items-center gap-2">
            <Target size={16} /> 1. Vision & Power Goals
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Define your <strong>North Star</strong> (One big SMART goal). Break it down into 12 annual <strong>Power Goals</strong>. Identify the single "High Impact" project to focus on now and define your daily next step (MINS).
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-blue-600 flex items-center gap-2">
            <Clock size={16} /> 2. Time & Energy Audit
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Log activities every 15 minutes. Label tasks <strong>Green</strong> (Energizing) or <strong>Red</strong> (Draining). Aim to Delete, Delegate, or Leverage the "Red" tasks to free up your schedule for high-value work.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-blue-600 flex items-center gap-2">
            <Activity size={16} /> 3. Daily Mastery
          </h3>
          <p className="text-slate-600 leading-relaxed">
            <strong>Night-Before Design:</strong> Plan 3 key tasks. <strong>First 90 Mins:</strong> Attack your #1 task with zero distractions. <strong>Pomodoro:</strong> Work in 25-minute intense sprints. Review goals 3x daily.
          </p>
        </div>

        <div className="space-y-2">
            <h3 className="font-bold text-blue-600 flex items-center gap-2">
              <Zap size={16} /> 4. Leverage (4 C's)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Multiply your output. <strong>Code:</strong> Automate with AI/Software. <strong>Content:</strong> Build SOPs/Checklists. <strong>Capital:</strong> Buy back time. <strong>Collaboration:</strong> Delegate using the 10/80/10 rule.
            </p>
          </div>
  
          <div className="space-y-2 md:col-span-2">
            <h3 className="font-bold text-blue-600 flex items-center gap-2">
              <Users size={16} /> 5. Scorecard & Environment
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Track one <strong>North Star Metric</strong> religiously. Set a high-stakes consequence for failure to ensure accountability. Audit your circle: spend more time with "Energy Amplifiers" and cut out "Energy Vampires".
            </p>
          </div>
      </div>
    </div>
  );
  
  // --- Main App ---
  
  export default function App() {
    const [activeTab, setActiveTab] = useState('vision');
    const [executionMode, setExecutionMode] = useState(false);
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [progress, setProgress] = useState({ total: 0, modules: {} });
  
    // Initial State
    const [data, setData] = useState({
      // Vision
      northStar: '',
      powerGoals: Array(12).fill(''),
      highImpactProject: '',
      mins: '',
      // Audit
      auditLog: [
        { time: '08:00 - 08:30', activity: '', energy: 'yellow', action: '' },
        { time: '08:30 - 09:00', activity: '', energy: 'yellow', action: '' }
      ],
      // Systems
      task1: '',
      task2: '',
      task3: '',
      morningAttack: false,
      pomodoro1: false,
      pomodoro2: false,
      reviews: [false, false, false],
      netTime: '',
      // Scorecard
      metric: '',
      accountability: '',
      friends: [
        { name: '', growth: false, proud: false, trust: false, energy: 'neutral' }
      ],
      // Leverage
      code: '',
      content: '',
      capital: '',
      collaboration: ''
    });
  
    // Load from Local Storage
    useEffect(() => {
      const savedData = localStorage.getItem('2026BlueprintData');
      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.error("Failed to load data", e);
        }
      }
    }, []);

    // Calculate Progress Effect
    useEffect(() => {
        const calculateModuleProgress = () => {
            // Vision: 3 main fields + 12 goals (total 15 points)
            const visionFilled = 
                (data.northStar ? 1 : 0) + 
                (data.highImpactProject ? 1 : 0) + 
                (data.mins ? 1 : 0) +
                data.powerGoals.filter(g => g.trim() !== '').length;
            const visionScore = (visionFilled / 15) * 100;

            // Audit: At least 3 log entries? No, let's just say if they have > 2 entries tailored.
            // Simplified: If activity is filled in > 2 rows.
            const validLogs = data.auditLog.filter(l => l.activity.trim() !== '').length;
            const auditScore = Math.min((validLogs / 5) * 100, 100); // Cap at 5 entries for "full"

            // Systems: 3 tasks + net time (4 pts)
            const systemsFilled = 
                (data.task1 ? 1 : 0) + (data.task2 ? 1 : 0) + (data.task3 ? 1 : 0) + (data.netTime ? 1 : 0);
            const systemsScore = (systemsFilled / 4) * 100;

            // Leverage: 4 text areas
            const leverageFilled = 
                (data.code ? 1 : 0) + (data.content ? 1 : 0) + (data.capital ? 1 : 0) + (data.collaboration ? 1 : 0);
            const leverageScore = (leverageFilled / 4) * 100;

            // Scorecard: Metric + Accountability + Friends
            const scorecardFilled = 
                (data.metric ? 1 : 0) + (data.accountability ? 1 : 0) + 
                (data.friends.filter(f => f.name).length > 0 ? 1 : 0);
            const scorecardScore = (scorecardFilled / 3) * 100;

            return {
                modules: {
                    vision: visionScore,
                    audit: auditScore,
                    systems: systemsScore,
                    leverage: leverageScore,
                    scorecard: scorecardScore
                },
                total: (visionScore + auditScore + systemsScore + leverageScore + scorecardScore) / 5
            };
        };

        setProgress(calculateModuleProgress());

    }, [data]);
  
    // Save Function
    const saveData = () => {
      localStorage.setItem('2026BlueprintData', JSON.stringify(data));
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 2000);
    };
  
    const clearData = () => {
      if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        localStorage.removeItem('2026BlueprintData');
        window.location.reload();
      }
    };
  
    const updateData = (section, newData) => {
      setData(prev => {
        return { ...prev, [section]: newData };
      });
    };
  
    const tabs = [
      { id: 'vision', label: '1. Vision', icon: Target },
      { id: 'audit', label: '2. Audit', icon: Clock },
      { id: 'systems', label: '3. Systems', icon: Activity },
      { id: 'leverage', label: '4. Leverage', icon: Zap },
      { id: 'scorecard', label: '5. Scorecard', icon: Users },
    ];
  
    const handlePrint = () => {
      window.print();
    };
  
    return (
      <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20 print:bg-white print:pb-0">
        
        {/* Navbar */}
        <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Layout size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">The 2026 Blueprint</h1>
                        <p className="text-xs text-slate-400">Interactive Workbook</p>
                    </div>
                </div>
                {/* Mobile Progress Widget */}
                 <div className="sm:hidden">
                    <CircularProgress percentage={progress.total} />
                 </div>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                 {/* Desktop Progress Widget */}
                 <div className="hidden sm:flex items-center gap-3 mr-4 border-r border-slate-700 pr-4">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Completion</p>
                        <p className="text-sm font-bold">{Math.round(progress.total)}% Ready</p>
                    </div>
                    <CircularProgress percentage={progress.total} />
                 </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setExecutionMode(!executionMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${executionMode ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <Smartphone size={18} /> <span className="hidden sm:inline">{executionMode ? 'Exit Mode' : 'Execution Mode'}</span>
                    </button>

                    <button 
                        onClick={saveData}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 transition-colors px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                        <Save size={18} /> <span className="hidden sm:inline">Save</span>
                    </button>
                    
                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 transition-colors px-4 py-2 rounded-lg text-sm font-semibold"
                        title="Click here then select 'Save as PDF' in the destination"
                    >
                        <Download size={18} /> <span className="hidden sm:inline">PDF</span>
                    </button>
                </div>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 print:p-0 print:w-full">
          
          {executionMode ? (
              <ExecutionMode data={data} updateData={updateData} />
          ) : (
            <>
                {/* Navigation Tabs */}
                <div className="flex overflow-x-auto gap-2 mb-8 pb-2 print:hidden scrollbar-hide">
                    {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const tabProgress = progress.modules[tab.id] || 0;
                    
                    return (
                        <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex flex-col items-start gap-1 px-5 py-3 rounded-xl font-semibold transition-all whitespace-nowrap min-w-[140px] ${
                            isActive 
                            ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' 
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={18} />
                                <span>{tab.label}</span>
                            </div>
                            {/* Mini Progress Bar in Tab */}
                            <div className="w-full h-1 bg-slate-300/50 rounded-full overflow-hidden">
                                <div className={`h-full ${isActive ? 'bg-blue-500' : 'bg-slate-400'} transition-all`} style={{ width: `${tabProgress}%` }}></div>
                            </div>
                        </button>
                    );
                    })}
                </div>
        
                {/* Content Area */}
                <div className="print:block">
                    {tabs.map((tab) => {
                    const Module = {
                        vision: VisionModule,
                        audit: AuditModule,
                        systems: SystemsModule,
                        leverage: LeverageModule,
                        scorecard: ScorecardModule,
                    }[tab.id];
        
                    const isVisible = activeTab === tab.id;
        
                    return (
                        <div 
                        key={tab.id} 
                        className={`
                            ${isVisible ? 'block' : 'hidden'} 
                            print:block print:mb-8 print:break-after-page 
                            bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-6 border border-slate-200/60 
                            print:shadow-none print:border-none print:p-0
                        `}
                        >
                        <Module data={data} updateData={updateData} progress={progress.modules[tab.id]} />
                        </div>
                    );
                    })}
                </div>
        
                {/* Footer actions */}
                <div className="mt-8 flex justify-between items-center pt-8 border-t border-slate-200 print:hidden">
                    <button onClick={clearData} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={16} /> Reset All Data
                    </button>
        
                    {tabs.findIndex(t => t.id === activeTab) < tabs.length - 1 && (
                    <button 
                        onClick={() => setActiveTab(tabs[tabs.findIndex(t => t.id === activeTab) + 1].id)}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                    >
                        Next Step <ArrowRight size={18} />
                    </button>
                    )}
                </div>
        
                {/* Quick Reference Guide */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-200/60 print:shadow-none print:border-none print:p-0 mt-6">
                    <FooterGuide />
                </div>
            </>
          )}
        </main>
  
        {/* Save Notification Toast */}
        {showSaveNotification && (
          <div className="fixed bottom-6 right-6 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-slideUp z-50 print:hidden">
            <CheckCircle className="text-green-400" size={20} />
            <span className="font-medium">Progress saved successfully!</span>
          </div>
        )}
  
        {/* Print-only CSS */}
        <style>{`
          @media print {
            @page { margin: 1cm; size: auto; }
            body { background-color: white; -webkit-print-color-adjust: exact; }
            header, button, nav { display: none !important; }
            .print\\:hidden { display: none !important; }
            .print\\:block { display: block !important; }
            .print\\:break-after-page { break-after: page; }
            .print\\:break-before-page { break-before: page; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:border-none { border: none !important; }
            input, textarea, select { border: 1px solid #ccc !important; background: none !important; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out forwards;
          }
          /* Hide scrollbar for tabs */
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}</style>
      </div>
    );
  }
