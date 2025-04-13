
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TableSchema {
  name: string;
  columns: { name: string; type: string; isPrimary?: boolean; isForeign?: boolean; references?: string }[];
}

interface DatabaseViewerProps {
  tables: TableSchema[];
}

const DatabaseViewer: React.FC<DatabaseViewerProps> = ({ tables }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Database Schema</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tables[0]?.name || "table1"}>
          <TabsList className="mb-4">
            {tables.map((table) => (
              <TabsTrigger key={table.name} value={table.name}>
                {table.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tables.map((table) => (
            <TabsContent key={table.name} value={table.name} className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.columns.map((column, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center">
                        {column.name}
                        {column.isPrimary && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-amber-100 text-amber-800">
                            PK
                          </span>
                        )}
                        {column.isForeign && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-blue-100 text-blue-800">
                            FK
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{column.type}</TableCell>
                      <TableCell>
                        {column.isPrimary && "PRIMARY KEY"}
                        {column.isForeign && column.references && (
                          <span>REFERENCES {column.references}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DatabaseViewer;
