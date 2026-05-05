import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, CreditCard } from 'lucide-react';

export default function ContactInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-[#1a2b4b] font-medium px-8 py-6 text-base rounded-lg shadow-lg">
          <MapPin className="w-5 h-5 mr-2" />
          Contact Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div>
            <h4 className="font-semibold text-[#1a2b4b] mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C2983B]" />
              Phone Numbers
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Main Number:</span>{' '}
                <a href="tel:+18453226500" className="hover:text-[#C2983B]">
                  +1 (845) 322-6500
                </a>
              </div>
              <div>
                <span className="font-medium">UK Office:</span>{' '}
                <a href="tel:03300276500" className="hover:text-[#C2983B]">
                  03 300 276500
                </a>
              </div>
              <div>
                <span className="font-medium">UK Sender Eckstein (direct):</span>{' '}
                <a href="tel:07940905991" className="hover:text-[#C2983B]">
                  07940-905-991
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2b4b] mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C2983B]" />
              Email
            </h4>
            <div className="text-sm text-gray-600">
              <a href="mailto:office@taubersolutions.com" className="hover:text-[#C2983B]">
                office@taubersolutions.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2b4b] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C2983B]" />
              Office Locations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <div className="font-medium text-[#1a2b4b] mb-1">Monsey</div>
                <div>67 North Airmont Rd</div>
                <div>Suffern, NY 10901</div>
              </div>
              <div>
                <div className="font-medium text-[#1a2b4b] mb-1">Manchester, England</div>
                <div>71 Wellington Street West</div>
                <div>Salford M7 2ED</div>
              </div>
              <div>
                <div className="font-medium text-[#1a2b4b] mb-1">Lakewood</div>
                <div>1750 Cedarbridge Ave, Suite 3</div>
                <div>Lakewood, NJ 08701</div>
              </div>
              <div>
                <div className="font-medium text-[#1a2b4b] mb-1">Boro Park</div>
                <div>5309 13th Ave</div>
                <div>Brooklyn, NY 11219</div>
                <div className="text-xs text-gray-500 mt-1">Second floor, Conference room</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a2b4b] mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C2983B]" />
              Payment Options
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Zelle:</span>{' '}
                <a href="mailto:Billing@taubersolutions.com" className="hover:text-[#C2983B]">
                  Billing@taubersolutions.com
                </a>
              </div>
              <div>
                <span className="font-medium">Debit Card:</span>{' '}
                <a href="https://taubersolutions.com/pay" target="_blank" rel="noopener noreferrer" className="hover:text-[#C2983B]">
                  taubersolutions.com/pay
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}