"use client"

import { useState, useEffect } from 'react'
import { 
  getAllLawyers, 
  getFilteredLawyers, 
  getRecommendedLawyers,
  LawyerFilters 
} from '@/lib/actions/lawyer-recommendations'
import type { LawyerProfile } from '@/types/index.d.ts'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { StarIcon, FilterIcon, MapPinIcon, DollarSignIcon, BriefcaseIcon, GlobeIcon, PhoneIcon, MailIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'

export function LawyerListing() {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<LawyerFilters>({})
  
  // For filter dialog
  const [practiceArea, setPracticeArea] = useState('')
  const [minExperience, setMinExperience] = useState<number>(0)
  const [maxFees, setMaxFees] = useState<number>(5000)
  const [minRating, setMinRating] = useState<number>(0)
  const [location, setLocation] = useState('')
  const [language, setLanguage] = useState('')

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true)
      try {
        // If no filters are active, get recommended lawyers first
        if (Object.keys(filters).length === 0) {
          const recommended = await getRecommendedLawyers(10)
          setLawyers(recommended)
        } else {
          const filtered = await getFilteredLawyers(filters)
          setLawyers(filtered)
        }
      } catch (error) {
        console.error("Error fetching lawyers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [filters])

  const applyFilters = () => {
    const newFilters: LawyerFilters = {}
    
    if (practiceArea) newFilters.practiceArea = practiceArea
    if (minExperience > 0) newFilters.minExperience = minExperience
    if (maxFees < 9999999) newFilters.maxFees = maxFees
    if (minRating > 0) newFilters.minRating = minRating
    if (location) newFilters.location = location
    if (language) newFilters.language = language
    
    setFilters(newFilters)
    setShowFilters(false)
  }

  const clearFilters = () => {
    setPracticeArea('')
    setMinExperience(0)
    setMaxFees(5000)
    setMinRating(0)
    setLocation('')
    setLanguage('')
    setFilters({})
  }

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Find a Lawyer</h2>
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              Filter Options
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Lawyers</DialogTitle>
              <DialogDescription>
                Customize your search to find the perfect lawyer for your needs
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Practice Area
                </label>
                <Select value={practiceArea} onValueChange={setPracticeArea}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Criminal">Criminal Law</SelectItem>
                    <SelectItem value="Family">Family Law</SelectItem>
                    <SelectItem value="Corporate">Corporate Law</SelectItem>
                    <SelectItem value="Tax">Tax Law</SelectItem>
                    <SelectItem value="Property">Property Law</SelectItem>
                    <SelectItem value="Immigration">Immigration Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Min. Experience
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Slider 
                    value={[minExperience]} 
                    min={0} 
                    max={30} 
                    step={1}
                    onValueChange={(values) => setMinExperience(values[0])} 
                  />
                  <span className="w-12 text-sm">{minExperience} yrs</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Max. Fees
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Slider 
                    value={[maxFees]} 
                    min={500} 
                    max={5000} 
                    step={100}
                    onValueChange={(values) => setMaxFees(values[0])} 
                  />
                  <span className="w-16 text-sm">${maxFees}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Min. Rating
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <Slider 
                    value={[minRating]} 
                    min={0} 
                    max={5} 
                    step={0.5}
                    onValueChange={(values) => setMinRating(values[0])} 
                  />
                  <span className="w-12 text-sm">{minRating} ★</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Location
                </label>
                <Input 
                  placeholder="City, State, or Country" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium col-span-1">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={clearFilters}>Clear All</Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500">Active filters:</span>
          {filters.practiceArea && (
            <Badge variant="secondary" className="gap-1">
              <BriefcaseIcon className="h-3 w-3" /> {filters.practiceArea}
            </Badge>
          )}
          {filters.minExperience && (
            <Badge variant="secondary" className="gap-1">
              Experience: {filters.minExperience}+ years
            </Badge>
          )}
          {filters.maxFees && (
            <Badge variant="secondary" className="gap-1">
              <DollarSignIcon className="h-3 w-3" /> Max ${filters.maxFees}
            </Badge>
          )}
          {filters.minRating && (
            <Badge variant="secondary" className="gap-1">
              {filters.minRating}+ ★
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPinIcon className="h-3 w-3" /> {filters.location}
            </Badge>
          )}
          {filters.language && (
            <Badge variant="secondary" className="gap-1">
              <GlobeIcon className="h-3 w-3" /> {filters.language}
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="p-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
              </div>
              <CardHeader className="h-24 bg-gray-200 rounded-t-lg"></CardHeader>
              <CardContent className="pt-4">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : lawyers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.userId} className="overflow-hidden">
              <div className="p-4 flex justify-center">
                {lawyer.profilePic ? (
                  <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    <Image 
                      src={lawyer.profilePic} 
                      alt={`${lawyer.name}'s profile`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{lawyer.name}</CardTitle>
                    <CardDescription>
                      {lawyer.barCouncilNumber && `Bar #${lawyer.barCouncilNumber}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    {renderStars(lawyer.rating)}
                    <span className="ml-1 text-sm text-gray-500">{lawyer.rating.toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span><strong>Experience:</strong> {lawyer.experience}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <DollarSignIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span><strong>Consultation Fee:</strong> ${lawyer.consultationFees}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                    <span>
                      <strong>Location:</strong> {lawyer.city}, {lawyer.state}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-1">
                    {lawyer.practiceAreas.slice(0, 3).map((area, i) => (
                      <Badge key={i} variant="outline">{area}</Badge>
                    ))}
                    {lawyer.practiceAreas.length > 3 && (
                      <Badge variant="outline">+{lawyer.practiceAreas.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <div className="flex items-center gap-4 mb-4">
                        {lawyer.profilePic ? (
                          <div className="relative h-20 w-20 rounded-full overflow-hidden">
                            <Image 
                              src={lawyer.profilePic} 
                              alt={`${lawyer.name}'s profile`} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <DialogTitle>{lawyer.name}</DialogTitle>
                          <div className="flex items-center gap-1">
                            {renderStars(lawyer.rating)}
                            <span className="ml-1 text-sm text-gray-500">{lawyer.rating.toFixed(1)} ({lawyer.reviews || 0} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{lawyer.phone || 'Not available'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
                              <span>{lawyer.email || 'Not available'}</span>
                            </div>
                            <div className="flex items-start text-sm">
                              <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                              <span>
                                {lawyer.city}, {lawyer.state}, {lawyer.country}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Professional Details</h4>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <strong>Bar Association:</strong> {lawyer.barCouncilNumber}
                            </div>
                            <div className="text-sm">
                              <strong>Experience:</strong> {lawyer.experience}
                            </div>
                            <div className="text-sm">
                              <strong>Consultation Fee:</strong> ${lawyer.consultationFees}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Practice Areas</h4>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {lawyer.practiceAreas.map((area, i) => (
                            <Badge key={i} variant="outline">{area}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {lawyer.languages.map((lang, i) => (
                            <Badge key={i} variant="secondary">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Schedule Consultation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button>Contact</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No lawyers found matching your criteria</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or broadening your search</p>
          <Button className="mt-4" onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </div>
  )
}