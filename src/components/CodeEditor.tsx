
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Play, RefreshCw, Save } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  readOnly?: boolean;
  onRunQuery?: (query: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = "SELECT * FROM users;",
  readOnly = false,
  onRunQuery
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunQuery = () => {
    if (onRunQuery) {
      setIsRunning(true);
      try {
        onRunQuery(code);
      } finally {
        setTimeout(() => {
          setIsRunning(false);
        }, 1000);
      }
    }
  };

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 py-2 px-4 border-b">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm font-medium">SQL Editor</p>
      </CardHeader>
      <CardContent className="p-0">
        <textarea
          className="w-full min-h-[200px] p-4 font-mono text-sm focus:outline-none resize-y bg-gray-900 text-gray-100 code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          placeholder="Write your SQL query here..."
          spellCheck="false"
        />
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 py-2 px-4 border-t">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setCode(initialCode)}>
            <RefreshCw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
        <Button 
          size="sm" 
          onClick={handleRunQuery} 
          disabled={isRunning || readOnly}
          className={isRunning ? "animate-pulse" : ""}
        >
          <Play className="h-4 w-4 mr-1" /> Run Query
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeEditor;
