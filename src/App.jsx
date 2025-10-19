import React, { useState } from 'react';
import { Search, CheckCircle, Clock, BookOpen, AlertCircle } from 'lucide-react';

const AcademicProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('remaining');

  // Completed subjects organized by year and semester
  const completedByPeriod = {
    '2223-1st': {
      label: 'SY 2223 First Semester',
      subjects: ['MATH 101', 'CHEM 015', 'CMPE 105', 'ENSC 013', 'PATHFIT 1', 'CMPE 102', 'CPET 102', 'NSTP 001']
    },
    '2223-2nd': {
      label: 'SY 2223 Second Semester',
      subjects: ['MATH 103', 'ENSC 014', 'ENSC 121', 'CMPE 103', 'PATHFIT 2', 'PHYS 013', 'GEED 005', 'CPET 101', 'CPET 103', 'NSTP 002']
    },
    '2324-1st': {
      label: 'SY 2324 First Semester',
      subjects: ['CPET 201', 'CMPE 101', 'CMPE-PC1', 'ELEC CPE-E1', 'CMPE 201', 'CMPE 104', 'GEED 032', 'ELEN 012', 'ECEN 011', 'PATHFIT 3']
    },
    '2324-2nd': {
      label: 'SY 2324 Second Semester',
      subjects: ['CPET 202', 'CMPE-PC2', 'ELEC CPE-E2', 'CMPE 401', 'STAT 012', 'GEED 008', 'CMPE 306', 'CMPE 304', 'CMPE 202', 'PATHFIT 4']
    },
    '2324-summer': {
      label: 'SY 2324 Summer',
      subjects: ['CPET 203', 'CMPE 205']
    },
    '2425-1st': {
      label: 'SY 2425 First Semester',
      subjects: ['CMPE 303', 'CMPE 308', 'CMPE-PC3', 'ELEC CPE-E3', 'CPET 301', 'CMPE 305', 'CPET 302', 'CMPE 311', 'ENGL 012']
    },
    '2425-2nd': {
      label: 'SY 2425 Second Semester',
      subjects: ['CPET 305', 'CPET 303', 'CMPE 313', 'CPET 304', 'ENSC 029', 'ENSC 411']
    }
  };

  // Flatten for easy lookup
  const completedSubjects = Object.values(completedByPeriod).flatMap(period => period.subjects);

  // Currently enrolled subjects (SY 2526 First Semester - grades pending)
  const currentlyEnrolled = [
    'CMPE 302', 'CMPE 310', 'CMPE 351', 'CMPE 402', 
    'CMPE 406', 'GEED 006', 'GEED 007', 'MATH 209'
  ];

  // All subjects in BSCPE curriculum with prerequisites
  const allSubjects = {
    // First Year First Semester
    'MATH 101': { prereqs: [], name: 'Calculus 1', units: 3.0 },
    'CHEM 015': { prereqs: [], name: 'Chemistry for Engineers', units: 4.0 },
    'CMPE 101': { prereqs: [], name: 'Computer Engineering as a Discipline', units: 1.0 },
    'GEED 004': { prereqs: [], name: 'Mathematics in the Modern World', units: 3.0 },
    'NSTP 001': { prereqs: [], name: 'National Service Training Program 1', units: 3.0 },
    'PATHFIT 1': { prereqs: [], name: 'Physical Activity Towards Health and Fitness 1', units: 2.0 },
    'CMPE 102': { prereqs: [], name: 'Programming Logic and Design', units: 2.0 },
    'GEED 007': { prereqs: [], name: 'Science, Technology and Society', units: 3.0 },
    'GEED 001': { prereqs: [], name: 'Understanding the Self', units: 3.0 },
    
    // First Year Second Semester
    'MATH 103': { prereqs: ['MATH 101'], name: 'Calculus 2', units: 3.0 },
    'CMPE 105': { prereqs: [], name: 'Computer Hardware Fundamentals', units: 2.0 },
    'CMPE 104': { prereqs: ['GEED 004'], name: 'Discrete Mathematics', units: 3.0 },
    'STAT 012': { prereqs: ['GEED 004'], name: 'Engineering Data Analysis', units: 3.0 },
    'NSTP 002': { prereqs: [], name: 'National Service Training Program 2', units: 3.0 },
    'CMPE 103': { prereqs: ['CMPE 101'], name: 'Object Oriented Programming', units: 2.0 },
    'PATHFIT 2': { prereqs: ['PATHFIT 1'], name: 'Physical Activity Towards Health and Fitness 2', units: 2.0 },
    'PHYS 013': { prereqs: ['MATH 101'], name: 'Physics for Engineers', units: 4.0 },
    'GEED 005': { prereqs: [], name: 'Purposive Communication', units: 3.0 },
    
    // Second Year First Semester
    'GEED 006': { prereqs: [], name: 'Art Appreciation', units: 3.0 },
    'CMPE 201': { prereqs: ['CMPE 103'], name: 'Data Structures and Algorithms', units: 2.0 },
    'MATH 209': { prereqs: ['MATH 103'], name: 'Differential Equations', units: 3.0 },
    'GEED 032': { prereqs: [], name: 'Filipinolohiya at Pambansang Kaunlaran', units: 3.0 },
    'ELEN 012': { prereqs: ['MATH 103', 'PHYS 013'], name: 'Fundamentals of Electrical Circuits', units: 4.0 },
    'GEED 037': { prereqs: [], name: 'Life and Works of Rizal', units: 3.0 },
    'PATHFIT 3': { prereqs: ['PATHFIT 2'], name: 'Physical Activity Towards Health and Fitness 3', units: 2.0 },
    'GEED 020': { prereqs: [], name: 'Politics, Governance and Citizenship', units: 3.0 },
    
    // Second Year Second Semester
    'CMPE 204': { prereqs: ['MATH 209'], name: 'Advanced Engineering Mathematics', units: 3.0 },
    'ENSC 121': { prereqs: [], name: 'Computer-Aided Drafting', units: 1.0 },
    'ECEN 011': { prereqs: ['ELEN 012'], name: 'Fundamentals of Electronic Circuits', units: 4.0 },
    'CMPE 203': { prereqs: ['MATH 209'], name: 'Numerical Methods', units: 3.0 },
    'CMPE 202': { prereqs: ['CMPE 201'], name: 'Operating Systems', units: 3.0 },
    'GEED 035': { prereqs: [], name: 'Panitikang Filipino', units: 3.0 },
    'PATHFIT 4': { prereqs: ['PATHFIT 3'], name: 'Physical Activity Towards Health and Fitness 4', units: 2.0 },
    'GEED 002': { prereqs: [], name: 'Readings in Philippine History', units: 3.0 },
    'GEED 003': { prereqs: [], name: 'The Contemporary World', units: 3.0 },
    
    // Summer (Year 2)
    'CMPE 205': { prereqs: [], name: 'On-the-Job Training (OJT) 1', units: 3.0 },
    
    // Third Year First Semester
    'CMPE 303': { prereqs: ['ECEN 011'], name: 'Computer Engineering Drafting and Design', units: 1.0 },
    'ELEC CPE-E1': { prereqs: [], name: 'CPE Elective 1', units: 3.0 },
    'CMPE 305': { prereqs: ['ECEN 011'], name: 'Data and Digital Communications', units: 4.0 },
    'ENSC 301': { prereqs: [], name: 'Engineering Economics', units: 3.0 },
    'CMPE 306': { prereqs: ['ECEN 011'], name: 'Fundamentals of Mixed Signals and Sensors', units: 3.0 },
    'CMPE 302': { prereqs: ['ECEN 011', 'CMPE 102'], name: 'Introduction Hardware Descriptive Language (HDL)', units: 1.0 },
    'CMPE 304': { prereqs: ['ECEN 011'], name: 'Logic Circuits and Design', units: 4.0 },
    'ENGL 013': { prereqs: [], name: 'Technical Report Writing', units: 3.0 },
    
    // Third Year Second Semester
    'CMPE 307': { prereqs: [], name: 'Basic Occupational Health and Safety', units: 3.0 },
    'CMPE 310': { prereqs: ['CMPE 305'], name: 'Computer Networks and Security', units: 4.0 },
    'ELEC CPE-E2': { prereqs: [], name: 'CPE Elective 2', units: 3.0 },
    'CMPE 308': { prereqs: [], name: 'CPE Laws and Professional Practice', units: 2.0 },
    'CMPE 309': { prereqs: ['ELEN 012', 'CMPE 203'], name: 'Feedback and Control System', units: 3.0 },
    'CMPE 312': { prereqs: ['STAT 012', 'GEED 005'], name: 'Methods of Research', units: 3.0 },
    'CMPE 311': { prereqs: ['CMPE 304'], name: 'Microprocessors', units: 4.0 },
    'ENSC 411': { prereqs: [], name: 'Technopreneurship 101', units: 3.0 },
    
    // Summer (Year 3)
    'CMPE 313': { prereqs: [], name: 'On-the-Job Training (OJT) 2', units: 3.0 },
    
    // Fourth Year First Semester
    'CMPE 403': { prereqs: ['CMPE 311'], name: 'Computer Architecture and Organization', units: 4.0 },
    'CMPE 402': { prereqs: [], name: 'Computer Project Management', units: 3.0 },
    'ELEC CPE-E3': { prereqs: [], name: 'CPE Elective 3', units: 3.0 },
    'CMPE 404': { prereqs: ['CMPE 311', 'CMPE 312'], name: 'CPE Practice and Design 1', units: 1.0 },
    'CMPE 401': { prereqs: ['CMPE 201'], name: 'Database Management Systems', units: 2.0 },
    'CMPE 405': { prereqs: ['CMPE 309'], name: 'Digital Signal Processing', units: 4.0 },
    'GEED 028': { prereqs: [], name: 'Reading Visual Arts', units: 3.0 },
    
    // Fourth Year Second Semester
    'ELEC CPE-E4': { prereqs: [], name: 'CPE Elective 4', units: 3.0 },
    'CMPE 407': { prereqs: ['CMPE 404'], name: 'CPE Practice and Design 2', units: 2.0 },
    'CMPE 409': { prereqs: ['CMPE 311'], name: 'Embedded Systems', units: 4.0 },
    'CMPE 410': { prereqs: [], name: 'Emerging Technologies in Computer Engineering', units: 3.0 },
    'GEED 008': { prereqs: [], name: 'Ethics', units: 3.0 },
    'CMPE 408': { prereqs: [], name: 'Field Trip and Seminars', units: 1.0 },
    'GEED 018': { prereqs: [], name: 'Gender and Society', units: 3.0 },
    'CMPE 406': { prereqs: ['CMPE 401'], name: 'Software Design', units: 4.0 },
    
    // Additional subjects
    'CMPE 351': { prereqs: [], name: 'Network Administration', units: 3.0 },
  };

  // Calculate remaining subjects
  const remainingSubjects = Object.keys(allSubjects).filter(
    code => !completedSubjects.includes(code) && !currentlyEnrolled.includes(code)
  );

  // Check if prerequisites are met
  const checkPrerequisites = (subject) => {
    const prereqs = allSubjects[subject]?.prereqs || [];
    // Only count completed subjects, NOT currently enrolled ones
    const met = prereqs.filter(p => completedSubjects.includes(p));
    const missing = prereqs.filter(p => !completedSubjects.includes(p));
    const pending = prereqs.filter(p => currentlyEnrolled.includes(p));
    return { met, missing, pending, allMet: missing.length === 0 && pending.length === 0 };
  };

  // Filter subjects based on search
  const filterSubjects = (subjects) => {
    return subjects.filter(code =>
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allSubjects[code]?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const SubjectCard = ({ code, status }) => {
    const subject = allSubjects[code];
    const prereqStatus = checkPrerequisites(code);
    const isSelected = selectedSubject === code;
    
    let borderColor = 'border-gray-200';
    let bgColor = 'bg-white';
    if (status === 'completed') {
      borderColor = 'border-green-300';
      bgColor = 'bg-green-50';
    } else if (status === 'current') {
      borderColor = 'border-blue-300';
      bgColor = 'bg-blue-50';
    } else if (!prereqStatus.allMet) {
      borderColor = 'border-red-300';
      bgColor = 'bg-red-50';
    } else {
      borderColor = 'border-yellow-300';
      bgColor = 'bg-yellow-50';
    }

    return (
      <div
        onClick={() => setSelectedSubject(isSelected ? null : code)}
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${borderColor} ${bgColor} ${
          isSelected ? 'shadow-lg ring-2 ring-offset-2 ring-blue-400' : 'hover:shadow-md'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-bold text-lg text-gray-800">{code}</div>
            <div className="text-sm text-gray-600">{subject?.name}</div>
            <div className="text-xs text-gray-500 mt-1">{subject?.units} units</div>
          </div>
          {status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {status === 'current' && <Clock className="w-5 h-5 text-blue-600" />}
        </div>

        {status === 'remaining' && (
          <>
            {subject?.prereqs.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  Prerequisites:
                </div>
                {prereqStatus.met.length > 0 && (
                  <div className="mb-1">
                    <div className="text-xs text-green-600 font-medium">✓ Completed:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prereqStatus.met.map(p => (
                        <span key={p} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {prereqStatus.pending.length > 0 && (
                  <div className="mb-1">
                    <div className="text-xs text-blue-600 font-medium">⏳ Currently Enrolled (Grade Pending):</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prereqStatus.pending.map(p => (
                        <span key={p} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {prereqStatus.missing.length > 0 && (
                  <div>
                    <div className="text-xs text-red-600 font-medium">✗ Not Yet Taken:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prereqStatus.missing.map(p => (
                        <span key={p} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {subject?.prereqs.length === 0 && (
              <div className="mt-2 text-xs text-green-600 font-medium">
                ✓ No prerequisites - Can enroll anytime
              </div>
            )}
            {prereqStatus.pending.length > 0 && prereqStatus.missing.length === 0 && (
              <div className="mt-2 text-xs text-blue-600 font-medium italic">
                ⚠️ Can only enroll if you pass the pending prerequisite(s)
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const stats = {
    completed: completedSubjects.length,
    current: currentlyEnrolled.length,
    remaining: remainingSubjects.length,
    total: Object.keys(allSubjects).length,
    canTake: remainingSubjects.filter(code => checkPrerequisites(code).allMet).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">BSCPE Academic Progress</h1>
              <p className="text-sm text-gray-600">Section: BSCpE 1-1P</p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">{stats.completed}</div>
              <div className="text-xs text-green-600">Completed</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{stats.current}</div>
              <div className="text-xs text-blue-600">Enrolled (Grades Pending)</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">{stats.canTake}</div>
              <div className="text-xs text-yellow-600">Ready Next Sem</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-700">{stats.remaining}</div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">
                {Math.round(((stats.completed + stats.current) / stats.total) * 100)}%
              </div>
              <div className="text-xs text-purple-600">Progress</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('remaining')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'remaining'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Remaining Subjects ({stats.remaining})
            </button>
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Enrolled This Sem ({stats.current})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'remaining' && (
            <>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>{stats.canTake} subjects</strong> are ready to take (all prerequisites met).
                    Subjects with red background are blocked by missing prerequisites.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterSubjects(remainingSubjects).map(code => (
                  <SubjectCard key={code} code={code} status="remaining" />
                ))}
              </div>
            </>
          )}

          {activeTab === 'current' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterSubjects(currentlyEnrolled).map(code => (
                <SubjectCard key={code} code={code} status="current" />
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-6">
              {Object.entries(completedByPeriod).map(([key, period]) => (
                <div key={key} className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {period.label}
                    <span className="text-sm font-normal text-gray-500">
                      ({period.subjects.filter(code => allSubjects[code]).length} subjects)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterSubjects(period.subjects).map(code => (
                      allSubjects[code] && <SubjectCard key={code} code={code} status="completed" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {((activeTab === 'remaining' && filterSubjects(remainingSubjects).length === 0) ||
            (activeTab === 'current' && filterSubjects(currentlyEnrolled).length === 0)) && (
            <div className="text-center text-gray-500 py-8">
              No subjects found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicProgress;