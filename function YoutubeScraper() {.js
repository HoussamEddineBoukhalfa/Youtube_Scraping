function YoutubeScraper() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = spreadSheet.getActiveSheet();

 var topics = [
  'Frameworks', 'Mathematics for Computer Science', 'Mathematics for Machine Learning', 
  'Mathematics in Computer Science', 'Computer Architecture', 'Databases', 'Advanced Databases',
  'Algorithms and Data Structures', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
  'Computer Graphics', 'Human-Computer Interaction', 'Software Engineering', 'Object-Oriented Programming',
  'Functional Programming', 'Logic Programming', 'Operating Systems', 'Distributed Systems',
  'Cloud Computing', 'High-Performance Computing', 'Quantum Computing', 'Cryptography',
  'Network Security', 'Cybersecurity', 'Blockchain Technology', 'Virtual Reality', 'Augmented Reality',
  'Mobile Application Development', 'Web Development', 'Game Development', 'Natural Language Processing',
  'Computational Linguistics', 'Bioinformatics', 'Computational Biology', 'Robotics', 'Autonomous Systems',
  'Sensor Networks', 'Wireless Networks', 'Internet of Things (IoT)', 'Big Data Analytics', 'Data Mining',
  'Database Management Systems', 'Information Retrieval', 'Computer Vision', 'Image Processing',
  'Audio Processing', 'Digital Signal Processing', 'Graph Theory', 'Complexity Theory', 'Computational Geometry',
  'Formal Methods', 'Programming Language Theory', 'Compiler Design', 'Embedded Systems', 'Real-Time Systems',
  'Distributed Databases', 'Parallel Computing', 'Systems Programming', 'Network Programming', 'API Design',
  'UX/UI Design', 'Software Testing', 'Software Maintenance', 'Agile Methodologies', 'DevOps',
  'Continuous Integration/Continuous Deployment', 'Microservices Architecture', 'Open Source Software',
  'Version Control Systems', 'Digital Forensics', 'Information Security', 'Ethical Hacking', 'Penetration Testing',
  'Virtualization', 'Cloud Storage', 'Cloud Services', 'Edge Computing', 'Smart Cities', 'Smart Grids',
  'Renewable Energy Systems', 'E-Commerce Systems', 'Fintech', 'Health Informatics', 'Medical Image Analysis',
  'Legal Informatics', 'Educational Technology', 'Social Network Analysis', 'Computational Social Science',
  'Environmental Informatics', 'Geographical Information Systems', 'Urban Informatics', 'Digital Humanities',
  'Digital Art', 'Computer Music', 'Computational Finance', 'Supply Chain Management Systems', 'Project Management Software',
  'Customer Relationship Management Systems', 'Enterprise Resource Planning Systems', 'Data Visualization',
  '3D Modeling', 'Animation', 'Interactive Media', 'Quantum Algorithms', 'Quantum Cryptography',
  'Quantum Machine Learning', 'Synthetic Biology', 'Nanotechnology', 'Space Technology',
  'Reinforcement Learning', 'Evolutionary Computation', 'Expert Systems', 'Decision Support Systems',
  'Search Algorithms', 'Swarm Intelligence', 'Neural Networks', 'Computer-Aided Design (CAD)',
  'Software Quality Assurance', 'Information Systems', 'Data Warehousing', 'Knowledge Representation',
  'Semantic Web Technologies', 'Ontology Engineering', 'Multi-agent Systems', 'Distributed Artificial Intelligence',
  'Humanoid Robotics', 'Computational Neuroscience', 'Predictive Analytics', 'Supervised Learning',
  'Unsupervised Learning', 'Semi-Supervised Learning', 'Ensemble Learning', 'Graph Neural Networks',
  'Transfer Learning', 'Meta-Learning', 'Feature Engineering', 'Model Selection', 'Dimensionality Reduction',
  'Kernel Methods', 'Bayesian Networks', 'Markov Models', 'Genetic Algorithms', 'Computational Creativity',
  'Speech Recognition', 'Speech Synthesis', 'Text-to-Speech Systems', 'Natural Language Understanding',
  'Language Translation', 'Sentiment Analysis', 'Text Mining', 'Information Extraction', 'Question Answering Systems',
  'Chatbots and Conversational Agents', 'Optical Character Recognition (OCR)', 'Pattern Recognition',
  'Face Recognition', 'Emotion Recognition', 'Gesture Recognition', 'Motion Capture', 'Augmented Analytics',
  'Data Science Platforms', 'Predictive Modelling', 'Statistical Analysis Software', 'Time Series Analysis',
  'Anomaly Detection', 'Data Cleansing', 'Data Integration', 'Data Governance', 'Master Data Management',
  'Metadata Management', 'Data Privacy', 'Data Security', 'Data Ethics', 'Cloud-Native Technologies',
  'Serverless Architectures', 'Containerization Technologies', 'Kubernetes and Container Orchestration',
  'Infrastructure as Code (IaC)', 'Platform as a Service (PaaS)', 'Function as a Service (FaaS)',
  'Software as a Service (SaaS)', 'Identity and Access Management (IAM)', 'Cloud Security Posture Management (CSPM)',
  'Cloud Access Security Brokers (CASB)', 'Secure Access Service Edge (SASE)', 'Zero Trust Security Models',
  'Security Information and Event Management (SIEM)', 'Threat Intelligence Platforms', 'Cyber Threat Hunting',
  'Incident Response and Forensics', 'Application Security', 'Secure Coding Practices', 'Security Testing and Auditing',
  'Compliance as Code', 'Cryptographic Protocols', 'Digital Identity and Authentication', 'Smart Contracts',
  'Decentralized Applications (DApps)', 'Cryptocurrency and Digital Assets', 'Tokenization and Digital Tokens',
  'Distributed Ledger Technology', 'Internet Protocol Version 6 (IPv6)', 'Network Function Virtualization (NFV)',
  'Software-Defined Networking (SDN)', '5G Technology and Applications', 'Satellite Communications', 'Optical Networks',
  'Edge AI and On-Device AI', 'Explainable AI (XAI)', 'Federated Learning', 'AI for Social Good', 'AI for Accessibility',
  'AI Ethics and Governance', 'AI Policy and Regulation', 'AI in Healthcare', 'AI in Education', 'AI in Finance',
  'AI in Agriculture', 'AI in Retail', 'AI in Manufacturing', 'AI in Transportation and Logistics', 'AI in Energy and Utilities',
  'AI in Media and Entertainment', 'AI in Tourism and Hospitality', 'AI in Sports Analytics', 'AI for Climate Change',
  'AI for Disaster Response', 'AI for Urban Planning', 'AI for Public Safety', 'AI for Governance', 'AI for Cultural Heritage',
  'AI in Arts and Creativity', 'AI for Personal Assistants', 'AI for Customer Experience', 'AI in Gaming', 'AI for Autonomous Driving',
  'AI for Smart Homes', 'AI for Supply Chain Optimization', 'AI for Predictive Maintenance', 'AI for Inventory Management',
  'AI for Quality Control', 'AI for Fraud Detection', 'AI for Risk Management'
];


  // Assuming you have a header row, start writing from the second row
  var currentRow = 2;

  // Loop through each topic
  topics.forEach(function (topic) {
    var search = YouTube.Search.list("snippet,id", {"q": topic, "maxResults": 50});
    var results = search.items.map(function (item) {
      // Check if the item is a video and has a videoId
      if (item.id.kind === "youtube#video") {
        return [item.id.videoId, item.snippet.title, item.snippet.publishedAt];
      }
    });

    // Filter out undefined entries that may have occurred if the item wasn't a video
    results = results.filter(function (result) { return result !== undefined; });

    // Get video IDs
    var ids = results.map(function (result) { return result[0]; }).join(',');

    // Get video statistics
    var stats = YouTube.Videos.list('statistics', {id: ids});
    var videoStats = stats.items.map(function (item) {
      return [
        item.statistics.viewCount, 
        item.statistics.likeCount, 
        item.statistics.dislikeCount // Dislike count may not be available due to YouTube API changes
      ];
    });

    // Write results to the spreadsheet
    var range = activeSheet.getRange(currentRow, 1, results.length, results[0].length);
    range.setValues(results);

    var statsRange = activeSheet.getRange(currentRow, 4, videoStats.length, videoStats[0].length);
    statsRange.setValues(videoStats);

    // Increment the currentRow by the number of results
    currentRow += results.length;
  });
}
