import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>ร้านค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">หน้าร้านค้า</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}