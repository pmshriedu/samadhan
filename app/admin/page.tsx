"use client";

import Link from "next/link";
import { Gavel, MessageSquareDot, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="min-h-[60vh] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">
            SAMADHAN administration panel for managing grievances
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/admin/samadhan-queue">
            <Card className="hover:shadow-lg transition-all hover:border-blue-300 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Gavel className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SAMADHAN Queue</h3>
                <p className="text-sm text-gray-500">
                  Review unassigned tickets and assign them to section officers
                  with priority levels.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/samadhan-tickets">
            <Card className="hover:shadow-lg transition-all hover:border-green-300 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquareDot className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SAMADHAN Tickets</h3>
                <p className="text-sm text-gray-500">
                  View all assigned tickets, track officer progress, and manage
                  escalations.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
