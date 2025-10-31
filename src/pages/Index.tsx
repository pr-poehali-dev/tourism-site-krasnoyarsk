import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const routes = [
    {
      title: "Уковский водопад",
      description: "Живописный водопад высотой 15 метров среди таежных лесов",
      difficulty: "Средняя",
      duration: "1 день",
      distance: "12 км",
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80"
    },
    {
      title: "Комаровские пороги",
      description: "Бурные пороги на реке с кристально чистой водой",
      difficulty: "Высокая",
      duration: "2 дня",
      distance: "25 км",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    },
    {
      title: "Водопад Богунай",
      description: "Мощный водопад в окружении скалистых утесов",
      difficulty: "Средняя",
      duration: "1 день",
      distance: "18 км",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
    },
    {
      title: "Зоопарк Зеленогорск",
      description: "Уникальный природный парк с местной фауной",
      difficulty: "Легкая",
      duration: "4 часа",
      distance: "5 км",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    },
    {
      title: "Манская петля",
      description: "Удивительный изгиб реки с панорамными видами",
      difficulty: "Легкая",
      duration: "6 часов",
      distance: "8 км",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')"
        }}
      >
        <div className="text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Походы по Красноярскому краю
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Откройте для себя величественные горы, водопады и дикую природу Сибири
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6"
            onClick={() => document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Посмотреть маршруты
            <Icon name="ChevronDown" className="ml-2" />
          </Button>
        </div>
      </div>

      <section className="py-16 px-4 md:px-8 bg-muted/30" id="routes">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Наши маршруты
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выберите приключение по душе — от семейных прогулок до экстремальных походов
            </p>
            <div className="mt-8 space-y-3">
              <a 
                href="https://t.me/hikingmountainsrafting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <Icon name="Send" size={20} />
                <span className="font-semibold">Смотрите фото и видео походов в Telegram</span>
              </a>
              <p className="text-sm text-muted-foreground italic">
                📅 Все цены и даты проведения походов находятся в нашем Telegram-канале
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {routes.map((route, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {route.difficulty}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{route.title}</CardTitle>
                  <CardDescription className="text-base">
                    {route.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Clock" size={18} className="mr-2" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Map" size={18} className="mr-2" />
                      <span>{route.distance}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Записаться
                    </Button>
                    <a 
                      href="https://t.me/hikingmountainsrafting" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-secondary-foreground hover:underline"
                    >
                      <Icon name="ExternalLink" size={16} />
                      Подробнее в Telegram
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-background" id="booking">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Запишитесь на поход
            </h2>
            <p className="text-lg text-muted-foreground">
              Оставьте заявку, и мы свяжемся с вами для уточнения деталей
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Ваше имя
                  </label>
                  <Input 
                    type="text"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Телефон
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Комментарий
                  </label>
                  <Textarea 
                    placeholder="Расскажите о вашем опыте походов и предпочтениях..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
                >
                  <Icon name="Send" className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Icon name="Users" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-primary-foreground/80">Довольных туристов</p>
            </div>
            <div className="space-y-2">
              <Icon name="Mountain" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">15+</h3>
              <p className="text-primary-foreground/80">Уникальных маршрутов</p>
            </div>
            <div className="space-y-2">
              <Icon name="Star" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">10 лет</h3>
              <p className="text-primary-foreground/80">Опыта работы</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-muted/50 text-center text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm">
            © 2024 Походы по Красноярскому краю. Все права защищены.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="tel:+79991234567" className="hover:text-primary transition-colors">
              <Icon name="Phone" size={20} />
            </a>
            <a href="mailto:info@походы-красноярск.рф" className="hover:text-primary transition-colors">
              <Icon name="Mail" size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;