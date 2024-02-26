<?php

declare(strict_types=1);

namespace oat\myPCI\migrations;

use Doctrine\DBAL\Schema\Schema;
use oat\tao\scripts\tools\migrations\AbstractMigration;
use Doctrine\Migrations\Exception\IrreversibleMigration;
use oat\qtiItemPci\model\IMSPciModel;
use oat\myPCI\scripts\install\RegisterPciSimplePCI;

/**
 * phpcs:disable Squiz.Classes.ValidClassName
 */
final class Version202402221558520187_myPCI extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Install/update PCI SimplePCI';
    }

    public function up(Schema $schema): void
    {
        $registry = (new IMSPciModel())->getRegistry();
        $this->addReport(
            $this->propagate(
                new RegisterPciSimplePCI()
            )(
                ['0.1.0']
            )
        );
    }

    public function down(Schema $schema): void
    {
        throw new IrreversibleMigration(
            'In order to undo this migration, please revert the client-side changes and run ' . RegisterPciSimplePCI::class
        );
    }
}
